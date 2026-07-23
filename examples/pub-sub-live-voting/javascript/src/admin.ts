import * as Ably from 'ably';
import { createAblyClient, getChannel } from './shared/ably';
import { renderChart } from './shared/chart';
import { displayName } from './shared/clientId';
import { showError } from './shared/errors';
import { generateSessionId } from './shared/sessionId';
import { IS_SANDBOX } from './config';
import {
  VOTE_ANNOTATION_TYPE,
  SUGGESTION_ANNOTATION_TYPE,
  SESSION_KEY,
  AdminState,
  PollMessage,
  PollType,
  ControlMessage,
  PollOption,
  PollDefinition,
  ControllerKind,
  SLOTS_BY_KIND,
  isControllerKind,
} from './shared/types';
import { slotGlyph } from './shared/controller';

// The operator console. It drives the show — it's the only role that *publishes
// poll messages*. Voters and the presenter only react to them. This view talks
// to the backend (the shows API + token auth), so it's not part of the
// in-browser sandbox demo; clone the repo and run the server to use it.

const VIEW_HTML = `
  <div id="app">
    <!-- Tab bar -->
    <nav class="admin-tabs" role="tablist">
      <button id="tab-manage" class="admin-tab active" role="tab" aria-selected="true" aria-controls="panel-manage">Manage Polls</button>
      <button id="tab-show" class="admin-tab" role="tab" aria-selected="false" aria-controls="panel-show">Run Show</button>
    </nav>

    <!-- ======= Manage Polls ======= -->
    <section id="panel-manage" class="view view-manage" role="tabpanel" aria-labelledby="tab-manage">
      <div class="manage-layout">
        <div class="manage-sidebar">
          <h2>Shows</h2>
          <ul id="show-list" class="show-list" role="listbox" tabindex="0"></ul>
          <div class="manage-sidebar-actions">
            <input id="new-show-name" type="text" placeholder="New show name" aria-label="New show name">
            <button id="btn-add-show" class="btn-primary">Add Show</button>
          </div>
        </div>

        <div class="manage-main" id="manage-main">
          <p class="subtle">Select a show to edit its polls.</p>
        </div>
      </div>
    </section>

    <!-- ======= Run Show — Setup ======= -->
    <section class="view view-setup" role="tabpanel" aria-labelledby="tab-show">
      <div class="card">
        <h1>Run a Show</h1>
        <form id="setup-form">
          <label for="show-select">Show</label>
          <select id="show-select" required></select>
          <button type="submit" id="btn-start-show">Start Show</button>
        </form>
      </div>
    </section>

    <!-- ======= Run Show — Active ======= -->
    <section class="view view-ready view-poll-open view-poll-closed view-show-qr" role="tabpanel" aria-labelledby="tab-show">
      <div class="admin-layout">
        <div class="admin-sidebar">
          <div class="admin-info">
            <p>Session: <strong id="session-display"></strong></p>
            <p>Show: <strong id="show-display"></strong></p>
            <p id="poll-progress"></p>
          </div>

          <div class="admin-controls">
            <button id="btn-start" class="btn-primary hidden">Start Poll</button>
            <button id="btn-close" class="btn-warning hidden">Close Voting</button>
            <button id="btn-clear-poll" class="btn-primary hidden">Clear Poll</button>
            <button id="btn-next" class="btn-primary hidden">Next Poll</button>
            <button id="btn-clear-suggestions" class="btn-warning hidden">Clear Suggestions</button>
            <hr>
            <label for="jump-select">Jump to section</label>
            <div class="jump-row">
              <select id="jump-select" aria-label="Jump to section"></select>
              <button id="btn-jump" class="btn-secondary">Go</button>
            </div>
            <hr>
            <a id="presenter-link" class="btn-secondary" target="_blank" rel="noopener">Open Presenter</a>
            <hr>
            <button id="btn-end-show" class="btn-danger">End Show</button>
          </div>
        </div>

        <div class="admin-main">
          <h2 id="admin-question" class="admin-question">Ready to start</h2>
          <div id="chart" class="chart"></div>
          <p id="vote-count" class="vote-count"></p>
        </div>
      </div>
    </section>
  </div>
`;

// ── State ──

let state: AdminState = 'manage';
let ablyClient: Ably.Realtime | null = null;
let channel: Ably.RealtimeChannel | null = null;
let sessionId: string;

// Show runner state
let runningShowId: number | null = null;
let showPolls: PollDefinition[] = [];
let showName = '';
let currentPollIndex = 0;
let currentPollSerial: string | null = null;
let currentPollId: number | null = null;
let currentPollType: PollType = 'list';
let currentPollOptions: PollOption[] = [];
let currentSummary: Ably.SummaryUniqueValues | null = null;
let suggestListener: ((a: Ably.Annotation) => void) | null = null;

// Poll editor state
let selectedShowId: number | null = null;

// Whether the active show store is read-only (static demo data). Fetched from
// the server's /api/config at startup. When true, editing controls are hidden
// and a notice is shown; running a show still works fully.
let readOnly = false;

const $ = (sel: string) => document.querySelector(sel) as HTMLElement;

// Build a URL on the current origin that carries the session id.
// Path "/" is the voter URL (encoded into the QR); "/?role=presenter" is the
// presenter URL. Both flow from admin → voter/screen, so they share the shape.
function buildSessionUrl(path: string): string {
  return `${path}?${SESSION_KEY}=${sessionId}`;
}

// ── Admin password ──
//
// The shows API and the admin Ably token are both gated on a password. The
// server serves the client statically, so (unlike a server-rendered admin
// page) the password isn't injected — we prompt for it once and cache it for
// the tab. It's sent as HTTP Basic auth on API calls and as the `password`
// auth param when minting the admin Ably token.
const PASSWORD_KEY = 'admin-password';

function getAdminPassword(): string {
  let pw = sessionStorage.getItem(PASSWORD_KEY);
  if (!pw) {
    pw = window.prompt('Admin password') || '';
    if (pw) sessionStorage.setItem(PASSWORD_KEY, pw);
  }
  return pw;
}

function authHeader(): Record<string, string> {
  // requireAdmin only checks the password half of the Basic credentials.
  return { Authorization: `Basic ${btoa(`admin:${getAdminPassword()}`)}` };
}

// ── API helpers ──

async function api(method: string, path: string, body?: any) {
  let res: Response;
  try {
    res = await fetch(path, {
      method,
      headers: {
        ...authHeader(),
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err: any) {
    const message = err?.message || String(err);
    showError(`${method} ${path}: ${message}`);
    throw err;
  }
  if (res.status === 401) {
    // Wrong/blank password — drop the cached value so the next attempt re-prompts.
    sessionStorage.removeItem(PASSWORD_KEY);
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = err.error || res.statusText || `Request failed (${res.status})`;
    showError(`${method} ${path} → ${res.status}: ${message}`);
    throw new Error(message);
  }
  return res.json();
}

// ── Tab switching ──

function setState(newState: AdminState) {
  state = newState;
  document.body.dataset.state = newState;
  if (newState !== 'manage') {
    updateShowControls();
  }
  if (newState === 'manage' || newState === 'setup') {
    clearSavedShowState();
  } else {
    saveShowState();
  }
}

const ADMIN_SHOW_STATE_KEY = 'admin-show-state';

interface SavedShowState {
  showId: number;
  sessionId: string;
  state: AdminState;
  currentPollIndex: number;
}

function saveShowState() {
  if (runningShowId === null || !sessionId) return;
  try {
    const data: SavedShowState = {
      showId: runningShowId,
      sessionId,
      state,
      currentPollIndex,
    };
    sessionStorage.setItem(ADMIN_SHOW_STATE_KEY, JSON.stringify(data));
  } catch {}
}

function clearSavedShowState() {
  try {
    sessionStorage.removeItem(ADMIN_SHOW_STATE_KEY);
  } catch {}
}

function loadSavedShowState(): SavedShowState | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_SHOW_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function initTabs() {
  const tabManage = $('#tab-manage');
  const tabShow = $('#tab-show');

  tabManage.addEventListener('click', () => {
    tabManage.classList.add('active');
    tabManage.setAttribute('aria-selected', 'true');
    tabShow.classList.remove('active');
    tabShow.setAttribute('aria-selected', 'false');
    setState('manage');
    loadShowList();
  });

  tabShow.addEventListener('click', async () => {
    tabShow.classList.add('active');
    tabShow.setAttribute('aria-selected', 'true');
    tabManage.classList.remove('active');
    tabManage.setAttribute('aria-selected', 'false');
    if (channel) {
      // Already running a show, restore the active state
      setState(state === 'manage' ? 'ready' : state);
    } else {
      await populateShowSelect();
      setState('setup');
    }
  });

  tabManage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { tabShow.focus(); tabShow.click(); }
  });
  tabShow.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { tabManage.focus(); tabManage.click(); }
  });
}

// ── Poll Management ──

async function loadShowList() {
  const shows = await api('GET', '/api/shows');
  const list = $('#show-list');
  list.innerHTML = '';
  for (const show of shows) {
    const li = document.createElement('li');
    li.role = 'option';
    li.tabIndex = 0;
    li.dataset.showId = String(show.id);
    li.classList.toggle('selected', show.id === selectedShowId);
    li.innerHTML = `
      <span class="show-name">${esc(show.name)}</span>
      <span class="show-count">${show.poll_count} polls</span>
    `;
    li.addEventListener('click', () => selectShow(show.id));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectShow(show.id); }
      if (e.key === 'ArrowDown') { (li.nextElementSibling as HTMLElement)?.focus(); }
      if (e.key === 'ArrowUp') { (li.previousElementSibling as HTMLElement)?.focus(); }
    });
    list.appendChild(li);
  }
}

async function selectShow(showId: number) {
  selectedShowId = showId;
  // Highlight in list
  document.querySelectorAll('#show-list li').forEach((li) => {
    (li as HTMLElement).classList.toggle('selected', (li as HTMLElement).dataset.showId === String(showId));
  });
  await renderPollEditor(showId);
}

async function renderPollEditor(showId: number) {
  const data = await api('GET', `/api/shows/${showId}/polls`);
  const main = $('#manage-main');

  let html = `${readonlyBanner()}<div class="poll-editor">
    <div class="poll-editor-header">
      <h2 contenteditable="${!readOnly}" id="show-name-edit" data-show-id="${showId}">${esc(data.show.name)}</h2>
      <button id="btn-delete-show" class="btn-danger-sm" aria-label="Delete show">Delete Show</button>
    </div>`;

  for (const poll of data.polls) {
    html += renderPollCard(poll);
  }

  html += `<div class="add-poll-card" data-poll-type="list">
    <input type="text" id="new-poll-question" placeholder="New question" aria-label="New poll question">
    <div class="poll-type-row">
      <label for="new-poll-type">Type:</label>
      ${renderPollTypeSelect('new-poll-type', 'list')}
    </div>
    <div class="poll-options-edit poll-options-list">
      <input type="text" id="new-poll-options" class="poll-options-input" placeholder="Options (comma separated)" aria-label="Poll options">
    </div>
    ${renderSlotInputs('dpad', 'new-poll', {}, true)}
    <div class="poll-options-edit poll-options-suggest hidden">
      <p class="subtle">Voters will type their own suggestions. No options to set.</p>
    </div>
    <button id="btn-add-poll" class="btn-primary">Add Poll</button>
  </div></div>`;

  main.innerHTML = html;
  bindPollEditorEvents(showId, data.polls);
}

const POLL_TYPE_LABELS: Record<PollType, string> = {
  list: 'List',
  dpad: 'D-pad',
  suggest: 'Suggest',
};

function renderPollTypeSelect(id: string, selected: PollType): string {
  const opts = (Object.keys(POLL_TYPE_LABELS) as PollType[]).map((t) =>
    `<option value="${t}" ${t === selected ? 'selected' : ''}>${POLL_TYPE_LABELS[t]}</option>`,
  ).join('');
  return `<select id="${id}" class="poll-type-select" aria-label="Poll type">${opts}</select>`;
}

function renderSlotInputs(kind: ControllerKind, idPrefix: string, bySlot: Record<string, string>, startHidden: boolean): string {
  const inputs = SLOTS_BY_KIND[kind].map((s) =>
    `<label class="slot-edit-slot slot-edit-${s}">
       <span class="slot-edit-glyph">${slotGlyph(s)}</span>
       <input type="text" class="slot-input" data-direction="${s}" placeholder="${s.toUpperCase()}" value="${esc(bySlot[s] ?? '')}">
     </label>`,
  ).join('');
  const hiddenCls = startHidden ? ' hidden' : '';
  return `<div class="poll-options-edit poll-options-${kind}${hiddenCls}" id="${idPrefix}-${kind}">
    <div class="slot-edit-grid kind-${kind}">${inputs}</div>
  </div>`;
}

function renderPollCard(poll: any): string {
  const type: PollType = poll.type ?? 'list';
  const listValue = poll.options.map((o: any) => esc(o.label)).join(', ');
  const bySlot: Record<string, string> = {};
  for (const o of poll.options) {
    if (o.direction) bySlot[o.direction] = o.label;
  }
  const slotEditors = (['dpad'] as ControllerKind[])
    .map((k) => renderSlotInputs(k, `poll-${poll.id}`, k === type ? bySlot : {}, k !== type))
    .join('');
  return `<div class="poll-card" data-poll-id="${poll.id}" data-poll-type="${type}">
    <div class="poll-card-header">
      <input type="text" class="poll-question-input" value="${esc(poll.question)}" aria-label="Poll question">
      ${renderPollTypeSelect(`poll-${poll.id}-type`, type)}
      <div class="poll-card-actions">
        <button class="btn-icon btn-move-up" aria-label="Move poll up" title="Move up">↑</button>
        <button class="btn-icon btn-move-down" aria-label="Move poll down" title="Move down">↓</button>
        <button class="btn-icon btn-delete-poll" aria-label="Delete poll" title="Delete">×</button>
      </div>
    </div>
    <div class="poll-options-edit poll-options-list ${type === 'list' ? '' : 'hidden'}">
      <input type="text" class="poll-options-input" value="${listValue}" aria-label="Poll options (comma separated)">
    </div>
    ${slotEditors}
    <div class="poll-options-edit poll-options-suggest ${type === 'suggest' ? '' : 'hidden'}">
      <p class="subtle">Voters will type their own suggestions. No options to set.</p>
    </div>
    <div class="poll-save-row">
      <button class="btn-secondary btn-save-poll">Save</button>
    </div>
  </div>`;
}

function readPollEditor(card: Element): { type: PollType; options: { label: string; direction?: string }[] } | null {
  const type = (card.querySelector('.poll-type-select') as HTMLSelectElement).value as PollType;
  if (type === 'suggest') {
    return { type, options: [] };
  }
  if (isControllerKind(type)) {
    const options: { label: string; direction: string }[] = [];
    const editor = card.querySelector(`.poll-options-${type}`);
    editor?.querySelectorAll<HTMLInputElement>('.slot-input').forEach((inp) => {
      const label = inp.value.trim();
      if (label) options.push({ label, direction: inp.dataset.direction! });
    });
    if (options.length === 0) return null;
    return { type, options };
  } else {
    const optionsStr = (card.querySelector('.poll-options-input') as HTMLInputElement).value;
    const options = optionsStr.split(',').map((s) => ({ label: s.trim() })).filter((o) => o.label);
    if (options.length === 0) return null;
    return { type, options };
  }
}

function bindPollTypeSwitch(card: Element) {
  const select = card.querySelector('.poll-type-select') as HTMLSelectElement;
  const sections: Array<[string, string]> = [
    ['.poll-options-list', 'list'],
    ['.poll-options-dpad', 'dpad'],
    ['.poll-options-suggest', 'suggest'],
  ];
  select?.addEventListener('change', () => {
    (card as HTMLElement).dataset.pollType = select.value;
    for (const [sel, kind] of sections) {
      card.querySelector(sel)?.classList.toggle('hidden', select.value !== kind);
    }
  });
}

function bindPollEditorEvents(showId: number, polls: any[]) {
  // Show name editing
  const nameEl = $('#show-name-edit');
  nameEl?.addEventListener('blur', async () => {
    const newName = nameEl.textContent?.trim();
    if (newName) {
      await api('PUT', `/api/shows/${showId}`, { name: newName });
      loadShowList();
    }
  });
  nameEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); nameEl.blur(); }
  });

  // Delete show
  $('#btn-delete-show')?.addEventListener('click', async () => {
    if (!confirm('Delete this show and all its polls?')) return;
    await api('DELETE', `/api/shows/${showId}`);
    selectedShowId = null;
    $('#manage-main').innerHTML = '<p class="subtle">Select a show to edit its polls.</p>';
    loadShowList();
  });

  // Per-poll save, delete, reorder
  document.querySelectorAll('.poll-card').forEach((card, idx) => {
    const pollId = Number((card as HTMLElement).dataset.pollId);
    bindPollTypeSwitch(card);

    card.querySelector('.btn-save-poll')?.addEventListener('click', async () => {
      const question = (card.querySelector('.poll-question-input') as HTMLInputElement).value.trim();
      const parsed = readPollEditor(card);
      if (!question || !parsed) return;
      await api('PUT', `/api/shows/${showId}/polls/${pollId}`, {
        question, type: parsed.type, options: parsed.options,
      });
      await renderPollEditor(showId);
    });

    card.querySelector('.btn-delete-poll')?.addEventListener('click', async () => {
      await api('DELETE', `/api/shows/${showId}/polls/${pollId}`);
      await renderPollEditor(showId);
    });

    card.querySelector('.btn-move-up')?.addEventListener('click', async () => {
      if (idx === 0) return;
      const order = polls.map((p: any) => p.id);
      [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
      await api('PUT', `/api/shows/${showId}/polls/reorder`, { order });
      await renderPollEditor(showId);
    });

    card.querySelector('.btn-move-down')?.addEventListener('click', async () => {
      if (idx === polls.length - 1) return;
      const order = polls.map((p: any) => p.id);
      [order[idx], order[idx + 1]] = [order[idx + 1], order[idx]];
      await api('PUT', `/api/shows/${showId}/polls/reorder`, { order });
      await renderPollEditor(showId);
    });
  });

  // Add poll
  const addCard = document.querySelector('.add-poll-card');
  if (addCard) bindPollTypeSwitch(addCard);
  $('#btn-add-poll')?.addEventListener('click', async () => {
    const question = ($('#new-poll-question') as HTMLInputElement).value.trim();
    if (!addCard) return;
    const parsed = readPollEditor(addCard);
    if (!question || !parsed) return;
    await api('POST', `/api/shows/${showId}/polls`, {
      question, type: parsed.type, options: parsed.options,
    });
    await renderPollEditor(showId);
    loadShowList();
  });
}

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

async function initManage() {
  await loadShowList();

  $('#btn-add-show').addEventListener('click', async () => {
    const input = $('#new-show-name') as HTMLInputElement;
    const name = input.value.trim();
    if (!name) return;
    await api('POST', '/api/shows', { name });
    input.value = '';
    await loadShowList();
  });

  // Allow Enter to submit
  $('#new-show-name').addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter') {
      e.preventDefault();
      ($('#btn-add-show') as HTMLButtonElement).click();
    }
  });
}

// ── Show Runner ──

async function populateShowSelect() {
  const shows = await api('GET', '/api/shows');
  const select = $('#show-select') as HTMLSelectElement;
  select.innerHTML = '';
  for (const show of shows) {
    const opt = document.createElement('option');
    opt.value = String(show.id);
    opt.textContent = `${show.name} (${show.poll_count} polls)`;
    select.appendChild(opt);
  }
}

function updateShowControls() {
  const totalPolls = showPolls.length;

  $('#poll-progress').textContent = (state === 'setup' || state === 'manage')
    ? ''
    : `Poll ${currentPollIndex + 1} of ${totalPolls}`;

  $('#btn-start').classList.toggle('hidden', state !== 'ready');
  $('#btn-close').classList.toggle('hidden', state !== 'poll-open');
  $('#btn-clear-poll').classList.toggle('hidden', state !== 'poll-closed');
  $('#btn-next').classList.toggle('hidden', state !== 'show-qr');
  $('#btn-clear-suggestions').classList.toggle(
    'hidden',
    !(currentPollType === 'suggest' && (state === 'poll-open' || state === 'poll-closed')),
  );

  if (state === 'show-qr' && currentPollIndex >= totalPolls - 1) {
    $('#btn-next').textContent = 'Finish';
  } else {
    $('#btn-next').textContent = 'Next Poll';
  }
}

function populateJumpSelect() {
  const select = $('#jump-select') as HTMLSelectElement;
  select.innerHTML = '';

  const startOpt = document.createElement('option');
  startOpt.value = 'start';
  startOpt.textContent = 'Start (QR / waiting)';
  select.appendChild(startOpt);

  for (let i = 0; i < showPolls.length; i++) {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = `${i + 1}. ${showPolls[i].question}`;
    select.appendChild(opt);
  }
}

function handleMessage(msg: Ably.Message) {
  if (msg.name === 'poll') {
    const data = msg.data as PollMessage;
    const summary = msg.annotations?.summary?.[VOTE_ANNOTATION_TYPE] as Ably.SummaryUniqueValues | undefined;

    if (msg.serial !== currentPollSerial) {
      currentPollSerial = msg.serial!;
      currentPollId = data.pollId;
      currentPollOptions = data.options;
      currentPollType = data.type ?? 'list';

      const idx = showPolls.findIndex((p) => p.id === data.pollId);
      if (idx !== -1) currentPollIndex = idx;

      currentSummary = summary ?? null;

      $('#admin-question').textContent = data.question;

      unsubscribeAdminSuggestions();
      if (currentPollType === 'suggest') {
        renderAdminSuggestList([]);
        subscribeAdminSuggestions();
      } else {
        renderChart($('#chart'), currentPollOptions, currentSummary, 'both');
      }
      updateTotalVotes();
      updateShowControls();
    } else if (summary && currentPollType !== 'suggest') {
      currentSummary = summary;
      renderChart($('#chart'), currentPollOptions, currentSummary, 'both');
      updateTotalVotes();
    }
  } else if (msg.name === 'control') {
    const data = msg.data as ControlMessage;
    if (data.action === 'clear-suggestions') {
      renderAdminSuggestList([]);
      return;
    }
    if (data.pollId === currentPollId) {
      if (data.action === 'close') setState('poll-closed');
      else if (data.action === 'show-qr') setState('show-qr');
    }
  }
}

let adminSuggestList: { text: string; from: string }[] = [];

function renderAdminSuggestList(items: { text: string; from: string }[]) {
  adminSuggestList = items;
  const chart = $('#chart');
  chart.innerHTML = '';
  const ul = document.createElement('ul');
  ul.className = 'admin-suggest-list';
  for (const item of items) {
    const li = document.createElement('li');
    const t = document.createElement('span');
    t.className = 'admin-suggest-text';
    t.textContent = item.text;
    const f = document.createElement('span');
    f.className = 'admin-suggest-from';
    f.textContent = item.from;
    li.appendChild(t);
    li.appendChild(f);
    ul.appendChild(li);
  }
  chart.appendChild(ul);
}

function subscribeAdminSuggestions() {
  if (!channel || suggestListener) return;
  const handler = (annotation: Ably.Annotation) => {
    if (annotation.action === 'annotation.delete') return;
    const text = annotation.name;
    const cid = annotation.clientId;
    if (!text || !cid) return;
    renderAdminSuggestList([{ text, from: displayName(cid) }, ...adminSuggestList]);
  };
  suggestListener = handler;
  channel.annotations.subscribe(SUGGESTION_ANNOTATION_TYPE, handler);
}

function unsubscribeAdminSuggestions() {
  if (channel && suggestListener) {
    channel.annotations.unsubscribe(SUGGESTION_ANNOTATION_TYPE, suggestListener);
  }
  suggestListener = null;
  adminSuggestList = [];
}

async function startPoll() {
  if (!channel) return;
  const poll = showPolls[currentPollIndex];
  currentPollOptions = poll.options;
  currentPollId = poll.id;
  currentSummary = null;

  try {
    // Starting a poll is just publishing a message. Voters and the presenter
    // attach their annotations to *this* message's serial.
    await channel.publish('poll', {
      pollId: poll.id,
      question: poll.question,
      type: poll.type,
      options: poll.options,
    } satisfies PollMessage);
  } catch (err: any) {
    showError(`Failed to start poll: ${err.message || err}`);
    return;
  }

  $('#admin-question').textContent = poll.question;
  if (poll.type === 'suggest') {
    renderAdminSuggestList([]);
  } else {
    renderChart($('#chart'), currentPollOptions, null, 'both');
  }
  updateTotalVotes();
  setState('poll-open');
}

async function closeVoting() {
  const pollId = currentPollId;
  if (!channel || pollId == null) return;
  try {
    await channel.publish('control', {
      action: 'close',
      pollId,
    } satisfies ControlMessage);
    setState('poll-closed');
  } catch (err: any) {
    showError(`Failed to close voting: ${err.message || err}`);
  }
}

async function clearPoll() {
  const pollId = currentPollId;
  if (!channel || pollId == null) return;
  const voterUrl = buildSessionUrl(`${window.location.origin}/`);
  try {
    await channel.publish('control', {
      action: 'show-qr',
      pollId,
      voterUrl,
    } satisfies ControlMessage);
    setState('show-qr');
  } catch (err: any) {
    showError(`Failed to clear poll: ${err.message || err}`);
  }
}

function nextPoll() {
  currentPollIndex++;
  if (currentPollIndex < showPolls.length) {
    startPoll();
  } else {
    currentPollIndex = 0;
    setState('ready');
    $('#admin-question').textContent = 'All polls complete!';
    $('#chart').innerHTML = '';
    $('#vote-count').textContent = '';
  }
}

async function jumpToSection() {
  const value = ($('#jump-select') as HTMLSelectElement).value;
  if (value === 'start') {
    if (!channel) return;
    const voterUrl = buildSessionUrl(`${window.location.origin}/`);
    try {
      await channel.publish('control', {
        action: 'reset',
        voterUrl,
      } satisfies ControlMessage);
    } catch (err: any) {
      showError(`Failed to jump to start: ${err.message || err}`);
      return;
    }
    currentPollIndex = 0;
    currentPollId = null;
    currentPollSerial = null;
    currentPollOptions = [];
    currentSummary = null;
    $('#admin-question').textContent = 'Ready to start';
    $('#chart').innerHTML = '';
    $('#vote-count').textContent = '';
    setState('ready');
    return;
  }
  currentPollIndex = parseInt(value, 10);
  startPoll();
}

function updateTotalVotes() {
  const total = currentPollOptions.reduce(
    (sum, opt) => sum + (currentSummary?.[opt.id]?.total ?? 0),
    0,
  );
  $('#vote-count').textContent = `${total} vote${total !== 1 ? 's' : ''}`;
}

async function connectToShow(
  showId: number,
  opts?: { sessionId?: string; initialState?: AdminState; pollIndex?: number },
) {
  const data = await api('GET', `/api/shows/${showId}/polls`);
  showPolls = data.polls;
  showName = data.show.name;
  runningShowId = showId;

  if (showPolls.length === 0) {
    showError('This show has no polls. Add some in the Manage Polls tab.');
    return;
  }

  sessionId = opts?.sessionId ?? generateSessionId();

  if (opts?.pollIndex !== undefined) {
    currentPollIndex = opts.pollIndex;
  }

  $('#session-display').textContent = sessionId;
  $('#show-display').textContent = showName;
  const presenterUrl = `${window.location.origin}/?role=presenter&${SESSION_KEY}=${sessionId}`;
  const presenterLink = $('#presenter-link') as HTMLAnchorElement;
  presenterLink.href = presenterUrl;
  // Open in a dedicated popup window (not just a tab) so the presenter view
  // is visually separable for screen-sharing. Modifier-clicks fall through to
  // the browser's normal new-tab behavior. The named target reuses the same
  // window across repeat clicks rather than spawning more.
  presenterLink.onclick = (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    window.open(presenterUrl, 'ably-voting-presenter', 'popup,width=1280,height=800');
  };

  populateJumpSelect();

  const password = getAdminPassword();

  const clientId = `admin-${sessionId}`;
  ablyClient = createAblyClient(clientId, sessionId, 'admin', { password });
  channel = getChannel(ablyClient, sessionId, 'admin');
  channel.subscribe(handleMessage);

  setState(opts?.initialState ?? 'ready');
}

function initShowRunner() {
  const form = $('#setup-form') as HTMLFormElement;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const showId = parseInt(($('#show-select') as HTMLSelectElement).value, 10);
    await connectToShow(showId);
  });

  $('#btn-start').addEventListener('click', startPoll);
  $('#btn-close').addEventListener('click', closeVoting);
  $('#btn-clear-poll').addEventListener('click', clearPoll);
  $('#btn-next').addEventListener('click', nextPoll);
  $('#btn-jump').addEventListener('click', jumpToSection);
  $('#btn-end-show').addEventListener('click', endShow);
  $('#btn-clear-suggestions').addEventListener('click', clearSuggestions);
}

async function clearSuggestions() {
  if (!channel) return;
  try {
    await channel.publish('control', {
      action: 'clear-suggestions',
      pollId: currentPollId!,
    } satisfies ControlMessage);
    renderAdminSuggestList([]);
  } catch (err: any) {
    showError(`Failed to clear: ${err.message || err}`);
  }
}

async function endShow() {
  if (!confirm('End the show? Voters and the presenter will see a closing screen.')) return;

  if (channel) {
    try {
      await channel.publish('control', { action: 'end' } satisfies ControlMessage);
    } catch (err: any) {
      showError(`Failed to end show: ${err.message || err}`);
      return;
    }
  }

  unsubscribeAdminSuggestions();
  if (ablyClient) {
    try { ablyClient.close(); } catch {}
  }
  ablyClient = null;
  channel = null;

  runningShowId = null;
  showPolls = [];
  showName = '';
  currentPollIndex = 0;
  currentPollSerial = null;
  currentPollId = null;
  currentPollType = 'list';
  currentPollOptions = [];
  currentSummary = null;

  await populateShowSelect();
  setState('setup');
}

// ── Init ──

function readonlyBanner(): string {
  return readOnly
    ? '<p class="readonly-note">Read-only demo — these polls come from a static data file and can’t be edited here. Switch to “Run Show” to run them.</p>'
    : '';
}

async function init() {
  try {
    const cfg = await api('GET', '/api/config');
    readOnly = cfg.readOnly === true;
  } catch {
    // Non-fatal: assume writable and let individual writes surface errors.
  }

  if (readOnly) {
    document.body.dataset.readonly = 'true';
    $('#manage-main').innerHTML = `${readonlyBanner()}<p class="subtle">Select a show to view its polls.</p>`;
  }
  initTabs();
  initManage();
  initShowRunner();

  const saved = loadSavedShowState();
  if (saved) {
    activateShowTab();
    try {
      await connectToShow(saved.showId, {
        sessionId: saved.sessionId,
        initialState: saved.state,
        pollIndex: saved.currentPollIndex,
      });
    } catch (err: any) {
      showError(`Failed to resume show: ${err.message || err}`);
      clearSavedShowState();
    }
  }
}

function activateShowTab() {
  const tabManage = $('#tab-manage');
  const tabShow = $('#tab-show');
  tabShow.classList.add('active');
  tabShow.setAttribute('aria-selected', 'true');
  tabManage.classList.remove('active');
  tabManage.setAttribute('aria-selected', 'false');
}

export function mount() {
  document.body.dataset.view = 'admin';
  document.body.dataset.state = 'manage';

  // The admin console needs the backend (shows API + token auth), which the
  // in-browser sandbox doesn't have. Clone the repo and run the server to use
  // it; the live docs demo only exercises the voter and presenter.
  if (IS_SANDBOX) {
    document.body.innerHTML = `
      <div id="app"><section class="view view-manage" style="display:flex">
        <div class="card">
          <h2>Admin runs against the backend</h2>
          <p class="subtle">The operator console drives the show and talks to the shows API and token-auth
          endpoint, so it isn't part of the in-browser demo. Clone the repo and run the server
          (see the README) to use it.</p>
        </div>
      </section></div>`;
    return;
  }

  document.body.innerHTML = VIEW_HTML;
  init();
}
