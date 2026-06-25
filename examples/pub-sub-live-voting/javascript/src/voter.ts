import * as Ably from 'ably';
import { createAblyClient, getChannel } from './shared/ably';
import { renderChart } from './shared/chart';
import { renderController } from './shared/controller';
import { voterClientId } from './shared/clientId';
import { showError } from './shared/errors';
import { isValidSessionId } from './shared/sessionId';
import { IS_SANDBOX, SANDBOX_CHANNEL_SEED } from './config';
import {
  VOTE_ANNOTATION_TYPE,
  SUGGESTION_ANNOTATION_TYPE,
  SESSION_KEY,
  VoterState,
  PollMessage,
  PollType,
  ControlMessage,
  PollOption,
  isControllerKind,
} from './shared/types';

// The phone-side view. A voter only ever *publishes* annotations (a vote, or a
// suggestion) onto the current poll message, and *subscribes* to the poll's
// annotation summary to show live percentages. It never sees other voters'
// individual votes — that high-volume stream goes to the presenter only.

const VIEW_HTML = `
  <div class="brand"><span class="brand-text">Ably Live Voting</span></div>
  <div id="app">
    <!-- No session in URL -->
    <section class="view view-no-session">
      <div class="card">
        <h2>Welcome!</h2>
        <p>Scan the QR code, or enter the full URL, to join in.</p>
      </div>
    </section>

    <!-- Session ID looks malformed (failed checksum) -->
    <section class="view view-invalid-session">
      <div class="card">
        <h2>Hmm, that doesn't look right</h2>
        <p>That session ID doesn't look right — please double-check the URL or rescan the QR code.</p>
      </div>
    </section>

    <!-- Enter Name -->
    <section class="view view-enter-name">
      <div class="card">
        <h1>Join the vote</h1>
        <p class="subtle">Session: <span id="session-name"></span></p>
        <form id="name-form">
          <label for="name-input">Pick a username</label>
          <input id="name-input" type="text" placeholder="Your username" required autocomplete="off" autofocus>
          <button type="submit" class="btn-primary">Join</button>
        </form>
      </div>
    </section>

    <!-- Waiting -->
    <section class="view view-waiting">
      <div class="card">
        <h2>Hi, <span id="display-name"></span>!</h2>
        <p class="pulse">Waiting for the next poll...</p>
      </div>
    </section>

    <!-- Voting / Voted / Results (same DOM, different styling via state) -->
    <section class="view view-voting view-voted view-results">
      <div class="card wide">
        <h2 id="question"></h2>
        <div id="options" class="options-grid"></div>
        <div id="chart" class="chart"></div>
        <p id="status-text" class="subtle"></p>
      </div>
    </section>

    <!-- Suggesting -->
    <section class="view view-suggesting">
      <div class="card wide">
        <h2 id="suggest-question"></h2>
        <form id="suggest-form" class="suggest-form">
          <input id="suggest-input" type="text" maxlength="60" autocomplete="off" placeholder="Type a suggestion…">
          <button type="submit" class="btn-primary">Submit</button>
        </form>
        <h3 id="my-suggestions-heading" class="my-suggestions-heading hidden">Your suggestions</h3>
        <ul id="my-suggestions" class="my-suggestions"></ul>
      </div>
    </section>

    <!-- Ended -->
    <section class="view view-ended">
      <div class="card">
        <h2>That's all, folks!</h2>
        <p>Thanks for taking part.</p>
      </div>
    </section>
  </div>
`;

let state: VoterState = 'enter-name';
let channel: Ably.RealtimeChannel;
let clientId: string;
let currentPollOptions: PollOption[] = [];
let currentPollType: PollType = 'list';
let currentPollSerial: string | null = null;
let currentPollId: number | null = null;
let currentSummary: Ably.SummaryUniqueValues | null = null;
let myVote: string | null = null;

let sessionId: string;

const $ = (sel: string) => document.querySelector(sel) as HTMLElement;

function setState(newState: VoterState) {
  state = newState;
  document.body.dataset.state = newState;
  const statusEl = document.getElementById('status-text');
  if (statusEl) {
    statusEl.textContent =
      newState === 'voted' ? 'Vote recorded! Tap another option to change your vote.' :
      newState === 'results' ? 'Voting closed' : '';
  }
}

interface SavedSession {
  clientId: string;
  name: string;
}

const sessionKey = (sid: string) => `voter-session-${sid}`;
const voteKey = (sid: string, pollId: number) => `voter-vote-${sid}-${pollId}`;
const suggestionsKey = (sid: string, pollId: number) => `voter-suggestions-${sid}-${pollId}`;

function loadSavedSession(sid: string): SavedSession | null {
  try {
    const raw = sessionStorage.getItem(sessionKey(sid));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadSavedVote(sid: string, pollId: number): string | null {
  try {
    return sessionStorage.getItem(voteKey(sid, pollId));
  } catch {
    return null;
  }
}

function saveVote(sid: string, pollId: number, optionId: string) {
  try {
    sessionStorage.setItem(voteKey(sid, pollId), optionId);
  } catch {}
}

function loadSavedSuggestions(sid: string, pollId: number): string[] {
  try {
    const raw = sessionStorage.getItem(suggestionsKey(sid, pollId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function appendSavedSuggestion(sid: string, pollId: number, text: string) {
  try {
    const existing = loadSavedSuggestions(sid, pollId);
    existing.push(text);
    sessionStorage.setItem(suggestionsKey(sid, pollId), JSON.stringify(existing));
  } catch {}
}

function connectAndWait(name: string, existingClientId?: string) {
  clientId = existingClientId ?? voterClientId(name);
  try {
    sessionStorage.setItem(sessionKey(sessionId), JSON.stringify({ clientId, name }));
  } catch {}

  $('#display-name').textContent = name;

  const ably = createAblyClient(clientId, sessionId, 'voter');
  channel = getChannel(ably, sessionId, 'voter');
  channel.subscribe(handleMessage);
  setState('waiting');
}

function handleMessage(msg: Ably.Message) {
  if (msg.name === 'poll') {
    const data = msg.data as PollMessage;
    const summary = msg.annotations?.summary?.[VOTE_ANNOTATION_TYPE] as Ably.SummaryUniqueValues | undefined;

    if (msg.serial !== currentPollSerial) {
      // New poll (or rewound message after refresh).
      currentPollOptions = data.options;
      currentPollType = data.type ?? 'list';
      currentPollSerial = msg.serial!;
      currentPollId = data.pollId;
      currentSummary = summary ?? null;

      if (currentPollType === 'suggest') {
        myVote = null;
        renderSuggestPoll(data);
        setState('suggesting');
        setSuggestFormDisabled(false);
      } else {
        myVote = loadSavedVote(sessionId, data.pollId);
        renderPoll(data);
        if (myVote) {
          setState('voted');
          highlightVote(myVote);
        } else {
          setState('voting');
        }
      }
    } else if (summary && currentPollType !== 'suggest') {
      // Annotation summary update for the current poll.
      currentSummary = summary;
      renderResults();
    }
  } else if (msg.name === 'control') {
    const data = msg.data as ControlMessage;
    if (data.action === 'end') {
      clearVoterStorage(sessionId);
      setState('ended');
      return;
    }
    if (data.action === 'reset') {
      currentPollSerial = null;
      currentPollId = null;
      currentPollOptions = [];
      currentSummary = null;
      myVote = null;
      setState('waiting');
      return;
    }
    if (data.pollId === currentPollId) {
      if (data.action === 'close') {
        setState('waiting');
      }
    }
  }
}

function clearVoterStorage(sid: string) {
  try {
    sessionStorage.removeItem(sessionKey(sid));
    const prefixes = [`voter-vote-${sid}-`, `voter-suggestions-${sid}-`];
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      if (key && prefixes.some((p) => key.startsWith(p))) sessionStorage.removeItem(key);
    }
  } catch {}
}

function renderSuggestPoll(data: PollMessage) {
  $('#suggest-question').textContent = data.question;
  const input = $('#suggest-input') as HTMLInputElement;
  input.value = '';
  renderMySuggestions(loadSavedSuggestions(sessionId, data.pollId));
}

function renderMySuggestions(items: string[]) {
  const list = $('#my-suggestions');
  const heading = $('#my-suggestions-heading');
  list.innerHTML = '';
  for (const text of items) {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
  }
  heading.classList.toggle('hidden', items.length === 0);
}

function setSuggestFormDisabled(disabled: boolean) {
  const input = $('#suggest-input') as HTMLInputElement;
  const submit = ($('#suggest-form') as HTMLFormElement).querySelector('button') as HTMLButtonElement;
  input.disabled = disabled;
  submit.disabled = disabled;
  if (disabled) input.placeholder = 'Suggestions closed';
  else input.placeholder = 'Type a suggestion…';
}

async function castSuggestion(text: string) {
  if (!currentPollSerial || currentPollId === null) return;
  try {
    // A suggestion is just an annotation with a free-text `name` on the poll
    // message. Same mechanism as a vote, different annotation type.
    await channel.annotations.publish(currentPollSerial, {
      type: SUGGESTION_ANNOTATION_TYPE,
      name: text,
    });
    appendSavedSuggestion(sessionId, currentPollId, text);
    renderMySuggestions(loadSavedSuggestions(sessionId, currentPollId));
  } catch (err: any) {
    showError(`Failed to submit: ${err.message || err}`);
  }
}

function renderControllerForVoter(selectedId: string | null) {
  if (!isControllerKind(currentPollType)) return;
  renderController(currentPollType, $('#options'), currentPollOptions, currentSummary, {
    clickable: state !== 'results',
    onClick: castVote,
    selectedId,
    showHeatmap: false,
    showLeaderBadge: false,
    display: 'percent',
  });
}

function renderPoll(data: PollMessage) {
  $('#question').textContent = data.question;

  const optionsEl = $('#options');
  const chartEl = $('#chart');

  if (isControllerKind(currentPollType)) {
    chartEl.innerHTML = '';
    chartEl.classList.add('hidden');
    optionsEl.innerHTML = '';
    optionsEl.classList.remove('options-grid');
    renderControllerForVoter(myVote);
  } else {
    chartEl.classList.remove('hidden');
    optionsEl.classList.remove('controller', 'controller-dpad');
    optionsEl.classList.add('options-grid');
    optionsEl.innerHTML = '';
    for (const opt of data.options) {
      const btn = document.createElement('button');
      btn.className = 'vote-button';
      btn.dataset.optionId = opt.id;
      btn.textContent = opt.label;
      btn.addEventListener('click', () => castVote(opt.id));
      optionsEl.appendChild(btn);
    }
    renderChart(chartEl, currentPollOptions, currentSummary, 'percent');
  }
}

function renderResults() {
  if (isControllerKind(currentPollType)) {
    renderControllerForVoter(myVote);
  } else {
    renderChart($('#chart'), currentPollOptions, currentSummary, 'percent');
  }
}

function highlightVote(optionId: string) {
  if (isControllerKind(currentPollType)) {
    renderControllerForVoter(optionId);
  } else {
    document.querySelectorAll('.vote-button').forEach((btn) => {
      (btn as HTMLElement).classList.toggle('selected', (btn as HTMLElement).dataset.optionId === optionId);
    });
  }
}

async function castVote(optionId: string) {
  if (!currentPollSerial || state === 'results') return;

  try {
    // The whole vote: publish a `vote:unique.v1` annotation naming the chosen
    // option onto the poll message. Because it's a `unique` annotation, Ably
    // replaces any previous vote from this clientId — tapping another option
    // moves your vote rather than adding a second one.
    await channel.annotations.publish(currentPollSerial, {
      type: VOTE_ANNOTATION_TYPE,
      name: optionId,
    });
    myVote = optionId;
    if (currentPollId !== null) saveVote(sessionId, currentPollId, optionId);
    highlightVote(optionId);
    setState('voted');
  } catch (err: any) {
    showError(`Failed to vote: ${err.message || err}`);
  }
}

function wireSuggestForm() {
  const suggestForm = $('#suggest-form') as HTMLFormElement;
  suggestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#suggest-input') as HTMLInputElement;
    const text = input.value.trim();
    if (!text) return;
    castSuggestion(text);
    input.value = '';
    input.focus();
  });
}

function init() {
  // Sandbox: skip the QR/session/name flow entirely and join the shared demo
  // channel as a single voter, so the preview pane is interactive immediately.
  if (IS_SANDBOX) {
    document.body.dataset.sandbox = 'true';
    sessionId = SANDBOX_CHANNEL_SEED!;
    wireSuggestForm();
    connectAndWait('You');
    return;
  }

  const params = new URLSearchParams(window.location.search);
  sessionId = params.get(SESSION_KEY) ?? '';
  if (!sessionId) {
    setState('no-session');
    return;
  }
  if (!isValidSessionId(sessionId)) {
    setState('invalid-session');
    return;
  }

  $('#session-name').textContent = sessionId;

  wireSuggestForm();

  const saved = loadSavedSession(sessionId);
  if (saved) {
    connectAndWait(saved.name, saved.clientId);
    return;
  }

  setState('enter-name');
  const nameInput = $('#name-input') as HTMLInputElement;
  nameInput.focus();

  const form = $('#name-form') as HTMLFormElement;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;
    connectAndWait(name);
  });
}

export function mount() {
  document.body.dataset.view = 'voter';
  document.body.dataset.state = 'enter-name';
  document.body.innerHTML = VIEW_HTML;
  init();
}
