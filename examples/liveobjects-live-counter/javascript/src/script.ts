import { CounterLocationObject, LiveCounter, MapLocationObject, Realtime } from 'ably';
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

  // initialize default state
  await root.default({
    [Color.red]: LiveCounter.struct(),
    [Color.green]: LiveCounter.struct(),
    [Color.blue]: LiveCounter.struct(),
  });
  subscribeToCounters(root);
  addEventListenersToButtons(root);
}

function subscribeToCounters(root: MapLocationObject) {
  // subscribe to root to get notified when counter objects get changed. this includes their value changes as well as instance changes when we reset them.
  // no need to subscribe to each counter object individually or handle instance management.
  root.subscribe(({ path, node }) => {
    const color = path as Color;
    if (Object.values(Color).includes(color)) {
      // counter at a color key got updated, update UI
      colorCountDivs[color].innerHTML = (node as LiveCounter).value().toString();
    }
  });

  // set the initial values for counters
  Object.values(Color).forEach((color) => {
    // next type assertion won't be needed with user provided typings support for LocationObject
    colorCountDivs[color].innerHTML = (root.get(color) as CounterLocationObject).value().toString();
  });
}

function addEventListenersToButtons(root: MapLocationObject) {
  document.querySelectorAll('.vote-button').forEach((button) => {
    const color = button.getAttribute('data-color') as Color;
    button.addEventListener('click', async () => {
      // next type assertion won't be needed with user provided typings support for LocationObject
      (root.get(color) as CounterLocationObject).increment(1);
    });
  });

  countersReset.addEventListener('click', () => {
    Object.values(Color).forEach(async (color) => root.set(color, LiveCounter.struct()));
  });
}

main()
  .then()
  .catch((e) => console.error(e));
