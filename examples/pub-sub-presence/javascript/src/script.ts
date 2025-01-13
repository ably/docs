import * as Ably from 'ably';
import { faker } from '@faker-js/faker';
import './styles.css';

const client = new Ably.Realtime({
  clientId: faker.person.firstName(),
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
});
const channel = client.channels.get('viewer-presence');
const button = document.getElementById('status-button');
const statusInput = document.getElementById('status-input') as HTMLInputElement;

async function initializePresence() {
  await channel.presence.subscribe(async () => {
    // Update the presence set whenever a set is entered, updated, or leaves.
    const members = await channel.presence.get();

    document.getElementById('active-users').innerHTML = '';

    members.forEach((member) => {
      addPresenceEntry(member.clientId, member.data);
    });
  });

  // Get presence set for initial rendering
  const presenceSet = await channel.presence.get();

  // Render each entry into the presence set
  if (presenceSet.length > 0) {
    presenceSet.forEach((member) => {
      addPresenceEntry(member.clientId, member.data);
    });
  }

  // Enter presence set with status 'Online'
  channel.presence.enter('Online');
}

async function addPresenceEntry(clientId: string, status: string) {
  const presenceList = document.getElementById('active-users');
  const userItem = document.createElement('li');
  userItem.id = clientId;
  userItem.className = 'flex items-center justify-between p-2 border-b';
  const statusDiv = document.createElement('div');
  statusDiv.className = 'flex flex-col';
  const clientIdSpan = document.createElement('span');
  clientIdSpan.innerText = clientId + (clientId === client.auth.clientId ? ' (You)' : '');
  const statusSpan = document.createElement('span');
  statusSpan.className = 'italic text-sm text-gray-500';
  statusSpan.innerText = status;

  statusDiv.appendChild(clientIdSpan);
  statusDiv.appendChild(statusSpan);
  userItem.appendChild(statusDiv);
  presenceList.appendChild(userItem);
}

button?.addEventListener('click', () => {
  if (statusInput?.value === '') {
    return;
  }

  channel.presence.update(statusInput.value);
});

initializePresence();
