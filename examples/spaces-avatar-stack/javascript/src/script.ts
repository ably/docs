import Spaces, { type SpaceMember } from '@ably/spaces';
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import minifaker from 'minifaker';
import { config } from './config';
import 'minifaker/locales/en';

export type Member = Omit<SpaceMember, 'profileData'> & {
  profileData: { memberColor: string; name: string };
};

connect();

async function connect() {
  const client = new Realtime({
    clientId: nanoid(),
    key: config.ABLY_KEY,
  });

  const urlParams = new URLSearchParams(window.location.search);
  const spaceName = urlParams.get('name') || 'spaces-avatar-stack';
  const spaces = new Spaces(client);
  const space = await spaces.get(spaceName);

  /** 💡 Add every avatar that enters 💡 */
  space.members.subscribe(['leave', 'remove'], (memberUpdate: SpaceMember) => {
    const avatar = document.querySelector(`[data-member-id="${memberUpdate.clientId}"]`);
    if (avatar) {
      avatar.remove();
    }
  });

  space.members.subscribe('enter', (memberUpdate: SpaceMember) => {
    const member: Member = {
      ...memberUpdate,
      profileData: {
        memberColor: (memberUpdate.profileData as any).memberColor,
        name: (memberUpdate.profileData as any).name,
      },
    };
    renderAvatar(member, true);
  });

  /** 💡 Enter the space as soon as it's available 💡 */
  space
    .enter({
      name: `${minifaker.firstName()} ${minifaker.lastName()}`,
      memberColor: minifaker.color(),
    })
    .then(async () => {
      const otherMembers = await space.members.getOthers();
      /** 💡 Get first four except the local member in the space 💡 */
      otherMembers.slice(0, 4).forEach((member) => {
        renderAvatar(member as Member);
      });
      /** 💡 Get a count of the number exceeding four and display as a single tally 💡 */
      if (otherMembers.length > 4) {
        renderExceedingCounter(otherMembers);
      }
    })
    .catch((err) => {
      console.error('Error joining space:', err);
    });
}

function buildUserInfo(member: Member, isSelf = false): HTMLDivElement {
  const userInitials = member.profileData.name
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('');

  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-center space-x-2';

  const initialsContainer = document.createElement('div');
  initialsContainer.className = 'rounded-full w-[40px] h-[40px] flex items-center justify-center';
  initialsContainer.style.backgroundColor = member.profileData.memberColor;

  const initials = document.createElement('p');
  initials.className = 'text-white text-sm font-medium';
  initials.textContent = userInitials;

  const nameContainer = document.createElement('div');
  nameContainer.className = 'flex flex-col';

  const name = document.createElement('p');
  name.className = 'text-sm font-medium';
  name.textContent = isSelf ? `${member.profileData.name} (You)` : member.profileData.name;

  initialsContainer.appendChild(initials);
  nameContainer.appendChild(name);
  wrapper.appendChild(initialsContainer);
  wrapper.appendChild(nameContainer);

  return wrapper;
}

async function renderAvatar(member: Member, isSelf: boolean = false): Promise<void> {
  const userInitials = member.profileData.name
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('');

  const avatarsElement = document.getElementById('avatars');
  if (avatarsElement) {
    const containerDiv = document.createElement('div');
    containerDiv.className = `relative ${isSelf ? '' : 'z-10'}`;

    const avatarContainer = document.createElement('div');
    avatarContainer.className = 'relative group';

    const avatar = document.createElement('div');
    avatar.className = 'rounded-full w-10 h-10 flex items-center justify-center cursor-pointer';
    avatar.style.backgroundColor = member.profileData.memberColor;
    avatar.setAttribute('data-member-id', member.clientId);
    avatar.setAttribute('key', member.clientId);

    const initials = document.createElement('p');
    initials.className = 'text-white text-sm font-medium';
    initials.textContent = userInitials;

    const popup = document.createElement('div');
    popup.className =
      'absolute left-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-[200px]';

    const popupCard = document.createElement('div');
    popupCard.className = 'uk-card uk-card-default uk-card-body p-2 rounded shadow-lg bg-white';

    const userInfo = buildUserInfo(member, isSelf);

    avatar.appendChild(initials);
    popupCard.appendChild(userInfo);
    popup.appendChild(popupCard);
    avatarContainer.appendChild(avatar);
    avatarContainer.appendChild(popup);
    containerDiv.appendChild(avatarContainer);
    avatarsElement.appendChild(containerDiv);
  }
}

function renderExceedingCounter(otherMembers: SpaceMember[]) {
  if (otherMembers.length > 4) {
    const avatarsElement = document.getElementById('avatars');
    if (avatarsElement) {
      const counterDiv = document.createElement('div');
      counterDiv.className = 'rounded-full w-10 h-10 flex items-center justify-center bg-gray-600 relative z-20';

      const counter = document.createElement('p');
      counter.className = 'text-white text-sm';
      counter.textContent = `+${otherMembers.length - 4}`;

      counterDiv.appendChild(counter);
      avatarsElement.appendChild(counterDiv);
    }
  }
}
