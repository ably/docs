import * as Ably from 'ably';
import QRCode from 'qrcode';
import { createAblyClient, getChannel } from './shared/ably';
import { renderChart } from './shared/chart';
import { renderController } from './shared/controller';
import { displayName } from './shared/clientId';
import { isValidSessionId } from './shared/sessionId';
import { IS_SANDBOX, SANDBOX_CHANNEL_SEED } from './config';
import {
  VOTE_ANNOTATION_TYPE,
  SUGGESTION_ANNOTATION_TYPE,
  SESSION_KEY,
  PresenterState,
  PollMessage,
  PollType,
  ControlMessage,
  PollOption,
  isControllerKind,
} from './shared/types';

// The big-screen view. The presenter is the consumer that wants *individual*
// annotation events, not just the summary: every vote and every suggestion
// becomes a floating bubble. That's a much higher-volume stream than the
// summary the voters get — which is exactly why annotations let each audience
// subscribe to the slice it needs.

const VIEW_HTML = `
  <div class="brand"><span class="brand-text">Ably Live Voting</span></div>
  <div id="app" class="presenter-app">
    <!-- Session ID looks malformed (failed checksum) -->
    <section class="view view-invalid-session">
      <div class="presenter-center">
        <h1 class="large">That session ID doesn't look right</h1>
        <p class="large">Please double-check the URL.</p>
      </div>
    </section>

    <!-- Live / Results -->
    <section class="view view-live view-results">
      <div class="presenter-center">
        <h1 id="question"></h1>
        <div id="chart" class="chart presenter-chart"></div>
      </div>
      <div id="vote-bubble-layer" class="bubble-layer"></div>
    </section>

    <!-- Suggesting -->
    <section class="view view-suggesting">
      <div class="suggest-stage">
        <h1 id="suggest-question" class="suggest-question"></h1>
        <div id="bubble-layer" class="bubble-layer"></div>
      </div>
    </section>

    <!-- No active poll -->
    <section class="view view-show-qr">
      <div class="presenter-center">
        <h1 id="show-qr-heading" class="large">Scan to join the show →</h1>
      </div>
    </section>

    <!-- Ended -->
    <section class="view view-ended">
      <div class="presenter-center">
        <h1 class="large">That's all, folks!</h1>
        <p class="large">Thanks for taking part.</p>
      </div>
    </section>
  </div>

  <!-- Persistent QR sidebar — always visible while a show is running. -->
  <aside class="presenter-qr-aside">
    <canvas id="qr-canvas"></canvas>
    <p class="qr-url-hint">No camera? Visit:</p>
    <a id="presenter-qr-url" class="qr-url-hint qr-url"></a>
  </aside>
`;

let channel: Ably.RealtimeChannel | null = null;
let currentPollOptions: PollOption[] = [];
let currentPollType: PollType = 'list';
let currentPollSerial: string | null = null;
let currentPollId: number | null = null;
let currentSummary: Ably.SummaryUniqueValues | null = null;
let suggestListener: ((a: Ably.Annotation) => void) | null = null;
let voteListener: ((a: Ably.Annotation) => void) | null = null;
let acceptingSuggestions = false;

const $ = (sel: string) => document.querySelector(sel) as HTMLElement;

function setState(newState: PresenterState) {
  document.body.dataset.state = newState;
}

function handleMessage(msg: Ably.Message) {
  if (msg.name === 'poll') {
    const data = msg.data as PollMessage;
    const summary = msg.annotations?.summary?.[VOTE_ANNOTATION_TYPE] as Ably.SummaryUniqueValues | undefined;

    if (msg.serial !== currentPollSerial) {
      currentPollOptions = data.options;
      currentPollType = data.type ?? 'list';
      currentPollSerial = msg.serial!;
      currentPollId = data.pollId;
      currentSummary = summary ?? null;

      if (currentPollType === 'suggest') {
        unsubscribeSuggestions();
        unsubscribeVotes();
        $('#suggest-question').textContent = data.question;
        $('#bubble-layer').innerHTML = '';
        subscribeSuggestions();
        setState('suggesting');
      } else {
        unsubscribeSuggestions();
        $('#question').textContent = data.question;
        renderResults();
        setState('live');
        subscribeVotes();
      }
    } else if (summary && currentPollType !== 'suggest') {
      currentSummary = summary;
      renderResults();
    }
  } else if (msg.name === 'control') {
    const data = msg.data as ControlMessage;
    if (data.action === 'end') {
      unsubscribeSuggestions();
      unsubscribeVotes();
      setState('ended');
      return;
    }
    if (data.action === 'reset') {
      unsubscribeSuggestions();
      unsubscribeVotes();
      currentPollSerial = null;
      currentPollId = null;
      currentPollOptions = [];
      currentSummary = null;
      if (data.voterUrl) showQR(data.voterUrl);
      return;
    }
    if (data.action === 'clear-suggestions') {
      $('#bubble-layer').innerHTML = '';
      return;
    }
    if (data.pollId === currentPollId) {
      if (data.action === 'close') {
        if (currentPollType === 'suggest') {
          acceptingSuggestions = false;
        } else {
          setState('results');
        }
      } else if (data.action === 'show-qr') {
        showQR(data.voterUrl!);
      }
    }
  }
}

async function showQR(voterUrl: string) {
  const canvas = $('#qr-canvas') as HTMLCanvasElement;
  await QRCode.toCanvas(canvas, voterUrl, { width: 1000, margin: 2 });
  // qrcode pins an inline 1000px width/height on the canvas, which would
  // override our stylesheet sizing. Clear it so the CSS clamp() wins while
  // the 1000px bitmap stays for crisp rendering.
  canvas.style.width = '';
  canvas.style.height = '';
  setState('show-qr');
}

function renderResults() {
  const chart = $('#chart');
  if (isControllerKind(currentPollType)) {
    // The d-pad heatmap: each slot fills proportionally to its share of the
    // leader, with a star badge on the winner — all driven by the summary.
    chart.classList.add('presenter-controller');
    renderController(currentPollType, chart, currentPollOptions, currentSummary, {
      showHeatmap: true,
      showLeaderBadge: true,
      display: 'percent',
    });
  } else {
    chart.classList.remove('presenter-controller', 'controller', 'controller-dpad');
    renderChart(chart, currentPollOptions, currentSummary, 'percent');
  }
}

function subscribeSuggestions() {
  if (!channel || suggestListener) return;
  acceptingSuggestions = true;
  const handler = (annotation: Ably.Annotation) => {
    if (!acceptingSuggestions) return;
    if (annotation.action === 'annotation.delete') return;
    const text = annotation.name;
    const cid = annotation.clientId;
    if (!text || !cid) return;
    spawnBubble($('#bubble-layer'), text, displayName(cid), { baseMs: 16000, decayPerAlive: 300, minMs: 3000 });
  };
  suggestListener = handler;
  channel.annotations.subscribe(SUGGESTION_ANNOTATION_TYPE, handler);
}

function unsubscribeSuggestions() {
  acceptingSuggestions = false;
  if (channel && suggestListener) {
    channel.annotations.unsubscribe(SUGGESTION_ANNOTATION_TYPE, suggestListener);
  }
  suggestListener = null;
}

function subscribeVotes() {
  if (!channel || voteListener) return;
  // One bubble per individual vote annotation. This is the high-volume stream
  // the summary spares the voters from; the presenter opts in via
  // annotation_subscribe.
  const handler = (annotation: Ably.Annotation) => {
    if (annotation.action === 'annotation.delete') return;
    const optionId = annotation.name;
    const cid = annotation.clientId;
    if (!optionId || !cid) return;
    const opt = currentPollOptions.find((o) => o.id === optionId);
    if (!opt) return;
    spawnBubble($('#vote-bubble-layer'), opt.label, displayName(cid), { baseMs: 1500, decayPerAlive: 0, minMs: 1500 });
  };
  voteListener = handler;
  channel.annotations.subscribe(VOTE_ANNOTATION_TYPE, handler);
}

function unsubscribeVotes() {
  if (channel && voteListener) {
    channel.annotations.unsubscribe(VOTE_ANNOTATION_TYPE, voteListener);
  }
  voteListener = null;
}

interface BubbleLifetime {
  baseMs: number;
  decayPerAlive: number;
  minMs: number;
}

function spawnBubble(layer: HTMLElement, text: string, attribution: string, lifetime: BubbleLifetime) {
  const el = document.createElement('div');
  el.className = 'bubble';
  el.innerHTML = `<span class="bubble-text"></span><span class="bubble-attribution"></span>`;
  el.querySelector('.bubble-text')!.textContent = text;
  el.querySelector('.bubble-attribution')!.textContent = attribution;

  const { x, y } = pickBubblePosition();
  el.style.left = `${x}%`;
  el.style.top = `${y}%`;

  const alive = layer.children.length;
  const lifetimeMs = Math.max(lifetime.minMs, lifetime.baseMs - alive * lifetime.decayPerAlive);
  el.style.setProperty('--lifetime', `${lifetimeMs}ms`);
  el.addEventListener('animationend', () => el.remove(), { once: true });

  layer.appendChild(el);
}

function pickBubblePosition(): { x: number; y: number } {
  // Polar around the centre, avoiding the question text in the middle.
  const angle = Math.random() * Math.PI * 2;
  const r = 25 + Math.random() * 20; // 25–45% of half-viewport
  const x = 50 + Math.cos(angle) * r;
  const y = 50 + Math.sin(angle) * r;
  return { x, y };
}

function connect(sessionId: string) {
  const clientId = `presenter-${crypto.randomUUID().slice(0, 8)}`;
  const ably = createAblyClient(clientId, sessionId, 'presenter');
  channel = getChannel(ably, sessionId, 'presenter');
  channel.subscribe(handleMessage);
}

function init() {
  // Sandbox: join the shared demo channel and wait for the auto-started poll
  // (published by demo-bootstrap). No QR — the voter pane is already connected.
  if (IS_SANDBOX) {
    document.body.dataset.sandbox = 'true';
    $('#show-qr-heading').textContent = 'Connecting…';
    setState('show-qr');
    connect(SANDBOX_CHANNEL_SEED!);
    return;
  }

  const sessionId = new URLSearchParams(window.location.search).get(SESSION_KEY);
  if (!sessionId || !isValidSessionId(sessionId)) {
    setState('invalid-session');
    return;
  }

  connect(sessionId);

  // Carry the presenter's querystring (the session) straight into the voter
  // URL — admin builds the presenter link with the same querystring, so they
  // stay in sync.
  const voterUrl = `${window.location.origin}/${window.location.search}`;
  showQR(voterUrl);

  // Manual-entry fallback: the short URL displayed under the QR for people
  // without a working camera. It already carries just the session, so it
  // matches the QR target.
  const qrLink = $('#presenter-qr-url') as HTMLAnchorElement;
  qrLink.textContent = `${window.location.host}/?${SESSION_KEY}=${sessionId}`;
  qrLink.href = voterUrl;
}

export function mount() {
  document.body.dataset.view = 'presenter';
  document.body.dataset.state = 'show-qr';
  document.body.innerHTML = VIEW_HTML;
  init();
}
