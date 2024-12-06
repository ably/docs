import * as Ably from 'ably';
import { ChatClient, PresenceEvent, PresenceMember, RoomOptionsDefaults } from '@ably/chat';
import { faker } from '@faker-js/faker';

const realtimeClient = new Ably.Realtime({
  clientId: faker.person.firstName(),
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
});
const chatClient = new ChatClient(realtimeClient);

// Get ROOM with typing capabilities
const room = chatClient.rooms.get('chat-online-status', { presence: RoomOptionsDefaults.presence });

const onlineStatuses = await room.presence.get();

async function addCard(onlineStatus: PresenceMember | PresenceEvent) {
  const card = document.createElement('div');
  card.className =
    'flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200';
  card.id = onlineStatus.clientId;
  const onlineStatusDiv = document.createElement('div');
  onlineStatusDiv.id = 'online-status';
  onlineStatusDiv.className = 'w-4 h-4 mr-3 rounded-full';
  onlineStatusDiv.classList.add(
    (onlineStatus.data as { status?: string })?.status === 'Away' ? 'bg-amber-500' : 'bg-green-500',
  );
  const nameParentDiv = document.createElement('div');
  const nameDiv = document.createElement('div');
  nameDiv.className = 'font-medium text-gray-900';
  nameDiv.textContent = onlineStatus.clientId + (onlineStatus.clientId === chatClient.clientId ? ' (You)' : '');
  const statusDiv = document.createElement('div');
  statusDiv.className = 'text-sm italic text-gray-600';
  statusDiv.textContent = (onlineStatus.data as { status?: string })?.status ?? 'Online';

  const parentDiv = document.getElementById('cards');
  parentDiv?.prepend(card);
  card.appendChild(onlineStatusDiv);
  card.appendChild(nameParentDiv);
  nameParentDiv.appendChild(nameDiv);
  nameParentDiv.appendChild(statusDiv);
}

onlineStatuses.forEach((onlineStatus: PresenceMember) => {
  addCard(onlineStatus);
});

/** 💡 Subscribe to the presence set of the room to see online statuses 💡 */
room.presence.subscribe((event: PresenceEvent) => {
  if (event.action === 'enter') {
    addCard(event);

    if (event.clientId === realtimeClient.auth.clientId) {
      const button = document.createElement('button');
      button.className = 'away-button w-32';
      button.id = 'status-button';
      button.onclick = async () => {
        await room.presence.update({
          status: (event.data as { status?: string })?.status === 'Away' ? 'Online' : 'Away',
        });
      };
      button.textContent = (event.data as { status?: string })?.status === 'Away' ? 'Show online' : 'Set away';

      const parentDiv = document.getElementById('cards');
      if (parentDiv) {
        parentDiv.appendChild(button);
      }
    }
  } else if (event.action === 'leave') {
    const card = document.getElementById(event.clientId);
    card?.remove();
  } else if (event.action === 'update') {
    if (event.clientId === realtimeClient.auth.clientId) {
      const button = document.getElementById('status-button');
      if (button) {
        button.textContent = (event.data as { status?: string })?.status === 'Away' ? 'Show online' : 'Set away';
        button.onclick = async () => {
          await room.presence.update({
            status: (event.data as { status?: string })?.status === 'Away' ? 'Online' : 'Away',
          });
        };
      }
    }
    const card = document.getElementById(event.clientId);
    const statusDiv = card?.querySelector('.text-sm');
    if (statusDiv) {
      statusDiv.textContent = (event.data as { status?: string })?.status ?? 'Online';
    }

    const parentDiv = document.getElementById(event.clientId);
    const onlineStatusDiv = parentDiv?.querySelector('#online-status');
    onlineStatusDiv.classList.add(
      (event.data as { status?: string })?.status === 'Away' ? 'bg-amber-500' : 'bg-green-500',
    );
    onlineStatusDiv.classList.remove(
      (event.data as { status?: string })?.status === 'Away' ? 'bg-green-500' : 'bg-amber-500',
    );
  }
});

/** 💡 Attach to the room to the online status presence set 💡 */
await room.attach();

/** 💡 Attach to the presence set to appear online 💡 */
await room.presence.enter({ status: 'Online' });
