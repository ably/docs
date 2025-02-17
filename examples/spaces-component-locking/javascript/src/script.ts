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

connect();

async function connect() {
  buildForm();

  const spaces = new Spaces(client);
  const urlParams = new URLSearchParams(window.location.search);
  const spaceName = urlParams.get('name') || 'spaces-component-locking';
  space = await spaces.get(spaceName);

  // /** 💡 Enter the space as soon as it's available 💡 */
  await space.enter({
    memberName: faker.person.fullName(),
    memberColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
  });

  const locks = await space.locks.getAll();

  if (locks.length > 0) {
    locks.map(async (lock) => {
      await updateComponent(lock);
    });
  }

  // /** 💡 Subscribe to all component updates 💡 */
  space.locks.subscribe('update', async (componentUpdate) => {
    // /** 💡 Update form on each components update 💡 */
    console.log(componentUpdate);
    await updateComponent(componentUpdate);
  });
}

async function updateComponent(componentUpdate: Lock) {
  const self = await space.members.getSelf();
  const locked = componentUpdate?.status === 'locked';

  const inputElement = document.getElementById(componentUpdate.id) as HTMLInputElement;
  const parentDiv = inputElement.closest('.input-cell-container');
  const inputContainer = parentDiv?.querySelector('.input-container');

  if (locked) {
    const lockHolder = componentUpdate.member as Member;
    const lockedByYou = locked && lockHolder?.connectionId === self?.connectionId;
    const readOnly = Boolean(lockHolder && !lockedByYou);

    const memberColor = lockHolder?.profileData.memberColor;
    const memberName = lockedByYou ? 'You' : lockHolder?.profileData.memberName;

    const lockedDiv = document.createElement('div');
    lockedDiv.className = 'lock';
    lockedDiv.id = 'lock';
    lockedDiv.innerHTML = `${memberName} ${lockedByYou ? '' : createLockedFieldSvg('text-base').outerHTML}`;
    lockedDiv.style.setProperty('--member-bg-color', memberColor);
    inputContainer?.appendChild(lockedDiv);

    inputElement.style.setProperty('--member-bg-color', memberColor);
    inputElement.setAttribute('data-locked', 'true');

    if (lockHolder) {
      inputElement.classList.remove('regular-cell');
      inputElement.classList.add('active-cell');
    } else {
      inputElement.classList.add('locked');
    }

    if (readOnly) {
      inputElement.classList.remove('full-access');
      inputElement.classList.add('read-only');
    }
  } else {
    const lockedDiv = inputContainer?.querySelector('.lock');

    if (lockedDiv) {
      inputContainer?.removeChild(lockedDiv);
    }
    inputElement.removeAttribute('data-locked');
    inputElement.classList.remove('locked', 'read-only', 'active-cell');
    inputElement.classList.add('regular-cell', 'full-access');
    inputElement.style.removeProperty('--member-bg-color');
  }
}

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
    inputCellContainer.id = 'input-cell-container';
    inputCellContainer.className = 'input-cell-container';
    inputCellContainer.style.setProperty('--member-bg-color', '#AC8600');
    const entryLabel = document.createElement('label');
    entryLabel.className = 'label';
    entryLabel.setAttribute('for', entry.name);
    entryLabel.textContent = entry.label;

    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    inputContainer.id = 'input-container';

    const formInput = document.createElement('input');
    formInput.id = entry.name;
    formInput.className = `input regular-cell full-access`;
    formInput.placeholder = 'Click to lock and edit me';
    formInput.name = entry.name;
    formInput.onfocus = (event) => {
      handleFocus(event);
    };
    formInput.onblur = (event) => {
      handleBlur(event);
    };

    innerContainer?.appendChild(inputCellContainer);
    inputCellContainer.appendChild(entryLabel);
    inputCellContainer?.appendChild(inputContainer);
    inputContainer?.appendChild(formInput);

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
