import * as Ably from 'ably';
import { SANDBOX_ABLY_KEY, SANDBOX_CHANNEL_SEED } from './config';
import { votingChannelName } from './shared/ably';
import demoShows from './demo-shows.json';
import { PollMessage, PollOption, VOTE_ANNOTATION_TYPE } from './shared/types';

// ─── SANDBOX ONLY ───────────────────────────────────────────────────────────
// None of this is part of the real app. In a real show the admin console
// starts the show and a live audience supplies the votes. The hosted docs
// demo has neither, so this module fakes a "host": it publishes one poll and
// seeds a handful of votes from throwaway clients, purely so the presenter
// pane is alive and expressive the moment the page loads. The real voter pane
// then adds its own live votes on top.
//
// Clone the repo and run the server (see the README) for the genuine flow —
// you'll never use this file there.

// Throwaway clients that each cast one vote. Distinct clientIds matter: votes
// are `unique` annotations, deduped per clientId, so N distinct voters are what
// give the heatmap N counts to spread across the options.
const SEED_VOTERS = 6;

const channelName = () => votingChannelName(SANDBOX_CHANNEL_SEED!);

// Auto-start the d-pad poll — the most expressive presenter screen (a heatmap
// with a leader badge), as opposed to a plain bar chart or the suggest stage.
function pickDpadPoll(): PollMessage | null {
  const show = (demoShows as { shows?: any[] }).shows?.[0];
  const polls: any[] = show?.polls ?? [];
  const dpad = polls.find((p) => p.type === 'dpad') ?? polls[0];
  if (!dpad) return null;
  return {
    pollId: dpad.id,
    question: dpad.question,
    type: dpad.type,
    // Option ids are strings on the wire (the server stringifies them); match that.
    options: (dpad.options ?? []).map((o: any): PollOption => ({
      id: String(o.id),
      label: o.label,
      direction: o.direction,
    })),
  };
}

export async function runDemoHost() {
  const poll = pickDpadPoll();
  if (!poll) return;

  const host = new Ably.Realtime({ key: SANDBOX_ABLY_KEY, clientId: 'demo-host' });
  const channel = host.channels.get(channelName(), { modes: ['publish', 'subscribe'] });

  // Publishing returns void, so read the serial back from the echoed message —
  // the seed votes are annotations and need the poll's serial to attach to.
  channel.subscribe('poll', (msg: Ably.Message) => {
    const data = msg.data as PollMessage;
    if (msg.serial && data.pollId === poll.pollId) {
      channel.unsubscribe('poll');
      seedVotes(poll, msg.serial);
    }
  });

  try {
    await channel.publish('poll', poll);
  } catch {
    /* best-effort demo seeding; ignore failures */
  }
}

function seedVotes(poll: PollMessage, serial: string) {
  // Stagger them so the presenter shows a trickle of vote bubbles rather than
  // one synchronised burst.
  for (let i = 0; i < SEED_VOTERS; i++) {
    setTimeout(() => castSeedVote(poll, serial), 600 + i * 350);
  }
}

function weightedPick(options: PollOption[]): PollOption {
  // Bias toward earlier options so a clear leader emerges on the heatmap.
  const weights = options.map((_, i) => options.length - i);
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < options.length; i++) {
    r -= weights[i];
    if (r <= 0) return options[i];
  }
  return options[0];
}

function castSeedVote(poll: PollMessage, serial: string) {
  if (poll.options.length === 0) return;
  const opt = weightedPick(poll.options);
  const suffix = Math.random().toString(36).slice(2, 6);
  // `Guest-xxxx` so the presenter's displayName() shows "Guest" on the bubble.
  const bot = new Ably.Realtime({ key: SANDBOX_ABLY_KEY, clientId: `Guest-${suffix}` });
  const channel = bot.channels.get(channelName(), { modes: ['annotation_publish'] });
  channel.annotations
    .publish(serial, { type: VOTE_ANNOTATION_TYPE, name: opt.id })
    .catch(() => {})
    // The vote persists in the summary after the bot leaves (annotations aren't
    // presence), so we can disconnect to free the connection.
    .finally(() => setTimeout(() => bot.close(), 2000));
}
