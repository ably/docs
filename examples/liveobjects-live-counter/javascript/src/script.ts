import { DefaultRoot, LiveCounter, LiveMap, Realtime } from 'ably';
import Objects from 'ably/objects';
import { nanoid } from 'nanoid';
import './styles.css';

export enum Color {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

const client = new Realtime({
  clientId: nanoid(),
  key: import.meta.env.VITE_ABLY_KEY as string,
  plugins: { Objects },
});

const urlParams = new URLSearchParams(window.location.search);

const channelName = urlParams.get('name') || 'objects-live-counter';
const channel = client.channels.get(channelName, { modes: ['OBJECT_PUBLISH', 'OBJECT_SUBSCRIBE'] });

const colorCountDivs: Record<Color, HTMLElement> = {
  red: document.getElementById('count-red')!,
  green: document.getElementById('count-green')!,
  blue: document.getElementById('count-blue')!,
};
const countersReset = document.getElementById('reset')!;

async function main() {
  await channel.attach();

  const objects = channel.objects;
  const root = await objects.getRoot();

  await initCounters(root);
  addEventListenersToButtons(root);
}

async function initCounters(root: LiveMap<DefaultRoot>) {
  // subscribe to root to get notified when counter objects get changed on the root.
  // for example, when we reset all counters
  root.subscribe(({ update }) => {
    Object.entries(update).forEach(([keyName, change]) => {
      if (change === 'removed') {
        return;
      }

      if (Object.values(Color).includes(keyName as Color)) {
        // key pointing to a counter object got updated, resubscribe to a counter
        const color = keyName as Color;
        subscribeToCounterUpdates(color, root.get(color)!);
      }
    });
  });

  await Promise.all(
    Object.values(Color).map(async (color) => {
      if (root.get(color)) {
        subscribeToCounterUpdates(color, root.get(color)!);
        return;
      }

      await root.set(color, await channel.objects.createCounter());
    }),
  );
}

function subscribeToCounterUpdates(color: Color, counter: LiveCounter) {
  counter.subscribe(() => {
    colorCountDivs[color].innerHTML = counter.value().toString();
  });
  colorCountDivs[color].innerHTML = counter.value().toString();
}

function addEventListenersToButtons(root: LiveMap<DefaultRoot>) {
  document.querySelectorAll('.vote-button').forEach((button) => {
    const color = button.getAttribute('data-color') as Color;
    button.addEventListener('click', () => {
      root.get(color)?.increment(1);
    });
  });

  countersReset.addEventListener('click', () => {
    Object.values(Color).forEach(async (color) => root.set(color, await channel.objects.createCounter()));
  });
}

main()
  .then()
  .catch((e) => console.error(e));
