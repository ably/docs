import Spaces, { Space, Lock, type SpaceMember } from '@ably/spaces';
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import { createLockedFieldSvg } from './LockedField';
import { faker } from '@faker-js/faker';

type Member = Omit<SpaceMember, 'profileData'> & {
  profileData: { memberColor: string; memberName: string };
};

interface Entry {
  label: string;
  name: string;
}

let space: Space;
const entries: Entry[] = [
  { label: 'Entry 1', name: 'entry1' },
  { label: 'Entry 2', name: 'entry2' },
  { label: 'Entry 3', name: 'entry3' },
];

const client = new Realtime({
  clientId: nanoid(),
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
});

const handleFocus = async (event: FocusEvent) => {
  const focusedElement = event.target as HTMLInputElement;
  const currentlyLockedElement = document.querySelector('[data-locked="true"]') as HTMLInputElement;

  if (currentlyLockedElement) {
    await space?.locks.release(currentlyLockedElement.name);
  }

  if (focusedElement.getAttribute('data-locked') === 'true') {
    return;
  }

  await space?.locks.acquire(focusedElement.name);
};

const handleBlur = async (event: FocusEvent) => {
  const focusedElement = event.target as HTMLInputElement;

  if (focusedElement.getAttribute('data-locked') !== 'true') {
    return;
  }

  if (event.relatedTarget) {
    space?.locks.release(focusedElement.name);
  }
};

function buildForm() {
  const innerContainer = document.getElementById('inner');

  entries.map((entry) => {
    const inputCellContainer = document.createElement('div');
    inputCellContainer.className = 'flex flex-col space-y-2';

    const entryLabel = document.createElement('label');
    entryLabel.className = 'text-sm font-medium text-gray-700';
    entryLabel.setAttribute('for', entry.name);
    entryLabel.textContent = entry.label;

    const inputContainer = document.createElement('div');
    inputContainer.className = 'relative rounded-md border border-gray-300 shadow-sm';

    const formInput = document.createElement('input');
    formInput.id = entry.name;
    formInput.className = 'uk-input w-full p-3 rounded-md transition-colors duration-200 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
    formInput.placeholder = 'Click to lock and edit me';
    formInput.name = entry.name;
    formInput.onfocus = handleFocus;
    formInput.onblur = handleBlur;

    innerContainer?.appendChild(inputCellContainer);
    inputCellContainer.appendChild(entryLabel);
    inputCellContainer.appendChild(inputContainer);
    inputContainer.appendChild(formInput);

    const channel = client.channels.get(`component-locking-${entry.name}`);

    channel.subscribe('update', (message) => {
      const input = document.getElementById(entry.name) as HTMLInputElement;
      if (input) {
        input.value = message.data.value;
      }
    });

    formInput.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      channel.publish('update', {
        value: target.value,
      });
    });
  });
}

async function connect() {
  const spaces = new Spaces(client);
  const urlParams = new URLSearchParams(window.location.search);
  const spaceName = urlParams.get('name') || 'spaces-component-locking';
  space = await spaces.get(spaceName);

  /** 💡 Enter the space as soon as it's available 💡 */
  await space.enter({
    memberName: faker.person.fullName(),
    memberColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
  });

  buildForm();

  const locks = await space.locks.getAll();

  if (locks.length > 0) {
    locks.map(async (lock) => {
      await updateComponent(lock);
    });
  }

  /** 💡 Subscribe to all component updates 💡 */
  space.locks.subscribe('update', async (componentUpdate) => {
    /** 💡 Update form on each components update 💡 */
    await updateComponent(componentUpdate);
  });
}

async function updateComponent(componentUpdate: Lock) {
  const self = await space.members.getSelf();
  const locked = componentUpdate?.status === 'locked';

  const inputElement = document.getElementById(componentUpdate.id) as HTMLInputElement;
  const parentDiv = inputElement.closest('.flex.flex-col');
  const inputContainer = parentDiv?.querySelector('.relative');

  if (locked) {
    const lockHolder = componentUpdate.member as Member;
    const lockedByYou = locked && lockHolder?.connectionId === self?.connectionId;
    const readOnly = Boolean(lockHolder && !lockedByYou);

    const memberColor = lockHolder?.profileData.memberColor;
    const memberName = lockedByYou ? 'You' : lockHolder?.profileData.memberName;

    const lockedDiv = document.createElement('div');
    lockedDiv.className = 'absolute top-2 right-2 flex items-center space-x-2';
    lockedDiv.innerHTML = `
      <span class="text-sm font-medium" style="color: ${memberColor}">${memberName}</span>
      ${!lockedByYou ? createLockedFieldSvg('w-4 h-4 text-gray-500').outerHTML : ''}
    `;
    inputContainer?.appendChild(lockedDiv);

    inputElement.style.backgroundColor = `${memberColor}10`;
    inputElement.setAttribute('data-locked', 'true');

    if (readOnly) {
      inputElement.classList.add('cursor-not-allowed', 'bg-gray-50');
      inputElement.disabled = true;
    }
  } else {
    const lockedDiv = inputContainer?.querySelector('.absolute');
    if (lockedDiv) {
      inputContainer?.removeChild(lockedDiv);
    }

    inputElement.removeAttribute('data-locked');
    inputElement.style.backgroundColor = '';
    inputElement.classList.remove('cursor-not-allowed', 'bg-gray-50');
    inputElement.disabled = false;
  }
}

connect();
