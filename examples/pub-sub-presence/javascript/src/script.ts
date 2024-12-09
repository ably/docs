import * as Ably from 'ably';
import { faker } from '@faker-js/faker';
import './styles.css';

const client = new Ably.Realtime({
  clientId: faker.person.firstName(),
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
});
const channel = client.channels.get('viewer-presence');

async function initializePresence() {
  await channel.presence.subscribe((member) => {
    const { action, clientId } = member;

    if (action === 'enter') {
      addPresenceEntry(clientId);
    } else if (action === 'leave') {
      document.getElementById(clientId)?.remove();
    }
  });

  const presenceSet = await channel.presence.get();

  if (presenceSet.length > 0) {
    presenceSet.forEach((member) => {
      addPresenceEntry(member.clientId);
    });
  }
}

async function addPresenceEntry(clientId: string) {
  const presenceList = document.getElementById('active-users');
  const userItem = document.createElement('li');
  userItem.id = clientId;
  userItem.className = 'flex items-center justify-between p-2 border-b';
  const clientIdSpan = document.createElement('span');
  clientIdSpan.innerText = clientId;
  const statusSpan = document.createElement('span');
  statusSpan.className = 'h-3 w-3 rounded-full bg-green-500';

  userItem.appendChild(clientIdSpan);
  userItem.appendChild(statusSpan);
  presenceList.appendChild(userItem);
}

const button = document.getElementById('toggle-presence');

button?.addEventListener('click', () => {
  if (button.textContent === 'Join') {
    button.textContent = 'Leave';
    channel.presence.enter();
  } else {
    button.textContent = 'Join';
    channel.presence.leave();
  }
});

initializePresence();
