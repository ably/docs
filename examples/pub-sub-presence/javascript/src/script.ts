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
    const { action, clientId, data } = member;

    switch (action) {
      case 'enter':
        addPresenceEntry(clientId);
        break;
      case 'leave':
        document.getElementById(clientId)?.remove();
        break;
      case 'update':
        const statusElement = document.getElementById(clientId)?.lastElementChild;
        const statusButton = document.getElementById('status-button');
        if (statusElement) {
          statusElement.classList.remove('bg-green-500', 'bg-amber-500');
          if (data === 'Away') {
            statusButton.textContent = 'Set online';
            statusElement.classList.add('bg-amber-500');
          } else if (data === 'Online') {
            statusButton.textContent = 'Set away';
            statusElement.classList.add('bg-green-500');
          }
        }
        break;
    }
  });

  const presenceSet = await channel.presence.get();

  if (presenceSet.length > 0) {
    presenceSet.forEach((member) => {
      addPresenceEntry(member.clientId);
    });
  }

  channel.presence.enter('Online');
}

async function addPresenceEntry(clientId: string) {
  const presenceList = document.getElementById('active-users');
  const userItem = document.createElement('li');
  userItem.id = clientId;
  userItem.className = 'flex items-center justify-between p-2 border-b';
  const clientIdSpan = document.createElement('span');
  clientIdSpan.innerText = clientId + (clientId === client.auth.clientId ? ' (You)' : '');
  const statusSpan = document.createElement('span');
  statusSpan.className = 'h-3 w-3 rounded-full bg-green-500';

  userItem.appendChild(clientIdSpan);
  userItem.appendChild(statusSpan);
  presenceList.appendChild(userItem);
}

const button = document.getElementById('status-button');

button?.addEventListener('click', () => {
  channel.presence.update(button.textContent === 'Set away' ? 'Away' : 'Online');
});

initializePresence();
