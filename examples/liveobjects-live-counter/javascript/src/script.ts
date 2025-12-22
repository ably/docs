import { Realtime } from 'ably';
import { LiveCounter, LiveMap, LiveObjects, type PathObject } from 'ably/liveobjects';
import { nanoid } from 'nanoid';
import { config } from './config';
import './styles.css';

type ColorCounters = {
  [Color.red]: LiveCounter;
  [Color.green]: LiveCounter;
  [Color.blue]: LiveCounter;
};

enum Color {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

const client = new Realtime({
  clientId: nanoid(),
  key: config.ABLY_KEY,
  plugins: { LiveObjects },
});

const channelName = config.CHANNEL_NAME || 'objects-live-counter';
const channel = client.channels.get(channelName, { modes: ['object_publish', 'object_subscribe'] });

const colorCountDivs: Record<Color, HTMLElement | null> = {
  red: document.getElementById('count-red'),
  green: document.getElementById('count-green'),
  blue: document.getElementById('count-blue'),
};
const countersReset = document.getElementById('reset');

async function main() {
  const countersObject = await channel.object.get<ColorCounters>();

  await initCounters(countersObject);
  addEventListenersToButtons(countersObject);
}

async function initCounters(counters: PathObject<LiveMap<ColorCounters>>) {
  await Promise.all(
    Object.values(Color).map(async (color) => {
      subscribeToCounterUpdates(color, counters.get(color));

      // Initialize counter if it doesn't exist
      if (counters.get(color).value() === undefined) {
        await counters.set(color, LiveCounter.create());
      }
    }),
  );
}

function subscribeToCounterUpdates(color: Color, counter: PathObject<LiveCounter>) {
  counter.subscribe(() => {
    if (colorCountDivs[color]) {
      colorCountDivs[color].innerHTML = counter.value()?.toString() ?? '0';
    }
  });
  if (colorCountDivs[color]) {
    colorCountDivs[color].innerHTML = counter.value()?.toString() ?? '0';
  }
}

function addEventListenersToButtons(counters: PathObject<LiveMap<ColorCounters>>) {
  document.querySelectorAll('.vote-button').forEach((button) => {
    const color = button.getAttribute('data-color') as Color;
    button.addEventListener('click', () => {
      counters.get(color).increment(1);
    });
  });

  countersReset?.addEventListener('click', () => {
    // Use batch to reset all counters atomically
    counters.batch((ctx) => {
      Object.values(Color).forEach((color) => ctx.set(color, LiveCounter.create()));
    });
  });
}

main()
  .then()
  .catch((e) => console.error(e));
