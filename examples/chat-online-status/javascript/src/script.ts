import * as Ably from 'ably';
import { ChatClient, PresenceEvent, PresenceMember, AllFeaturesEnabled } from '@ably/chat';
import minifaker from 'minifaker';
import 'minifaker/locales/en';

const realtimeClient = new Ably.Realtime({
  clientId: minifaker.firstName(),
  key: import.meta.env.VITE_ABLY_KEY as string,
});
const chatClient = new ChatClient(realtimeClient);

async function initializeChat() {
  const urlParams = new URLSearchParams(window.location.search);
  const channelName = urlParams.get('name') || 'chat-online-status';

  // Get ROOM with typing capabilities
  const room = await chatClient.rooms.get(channelName, {
    presence: AllFeaturesEnabled.presence,
  });
  const onlineStatuses = await room.presence.get();

  for (const onlineStatus of onlineStatuses) {
    await addCard(onlineStatus);
  }

  /** 💡 Subscribe to the presence set of the room to see online statuses 💡 */
  room.presence.subscribe(async (event: PresenceEvent) => {
    if (event.action === 'enter') {
      await addCard(event);

      if (event.clientId === realtimeClient.auth.clientId) {
        const button = document.createElement('button');
        button.className = 'uk-btn uk-btn-md uk-btn-primary mb-4 rounded-[1998px] w-full min-w-[120px] border uk-border-primary';
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

  /** 💡 Attach the client to a room to begin streaming messages and events to the client.💡 */
  await room.attach();

  /** 💡 Enter presence to appear online 💡 */
  await room.presence.enter({ status: 'Online' });
}

async function addCard(onlineStatus: PresenceMember | PresenceEvent) {
  // Create an element to store status items
  const card = document.createElement('div');
  card.className =
    'flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200';
  card.id = onlineStatus.clientId;

  // Create element to store online status
  const onlineStatusDiv = document.createElement('div');
  onlineStatusDiv.id = 'online-status';
  onlineStatusDiv.className = 'w-4 h-4 mr-3 rounded-full';
  onlineStatusDiv.classList.add(
    (onlineStatus.data as { status?: string })?.status === 'Away' ? 'bg-amber-500' : 'bg-green-500',
  );

  // Create elements to store name and status
  const nameParentDiv = document.createElement('div');
  const nameDiv = document.createElement('div');
  nameDiv.className = 'font-medium';
  nameDiv.textContent = onlineStatus.clientId + (onlineStatus.clientId === chatClient.clientId ? ' (You)' : '');
  const statusDiv = document.createElement('div');
  statusDiv.className = 'text-sm italic';
  statusDiv.textContent = (onlineStatus.data as { status?: string })?.status ?? 'Online';

  const parentDiv = document.getElementById('cards');
  parentDiv?.prepend(card);
  card.appendChild(onlineStatusDiv);
  card.appendChild(nameParentDiv);
  nameParentDiv.appendChild(nameDiv);
  nameParentDiv.appendChild(statusDiv);
}

initializeChat().catch((error) => {
  console.log('Error initializing chat', error);
});
