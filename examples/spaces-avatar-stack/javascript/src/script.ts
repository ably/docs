import Spaces, { type SpaceMember } from "@ably/spaces";
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';

export type Member = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; name: string };
};
const mockNames: string[] = ["Anum Reeve", "Tiernan Stubbs", "Hakim Hernandez"];
const mockColors: string[] = ["#9951F5", "#f1c232", "#f44336"];

connect()

async function connect() {
  const client = new Realtime({
    clientId: nanoid(),
    key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
  });

  const spaces = new Spaces(client);
  const space = await spaces.get('avatar-stack');

  /** 💡 Add every avatar that enters 💡 */
  space.members.subscribe('enter', (memberUpdate: SpaceMember) => {
    const member: Member = {
      ...memberUpdate,
      profileData: {
        memberColor: (memberUpdate.profileData as any).memberColor,
        name: (memberUpdate.profileData as any).name,
      }
    };
    renderAvatar(member, true);
  });

  /** 💡 Enter the space as soon as it's available 💡 */
  space.enter({
    name: mockNames[Math.floor(Math.random() * mockNames.length)],
    memberColor: mockColors[Math.floor(Math.random() * mockColors.length)],
  }).then(async () => {
    const otherMembers = await space.members.getOthers();

    /** 💡 Get first four except the local member in the space 💡 */
    otherMembers.slice(0, 4).forEach((member) => {
      renderAvatar(member as Member);
    });

    /** 💡 Get a count of the number exceeding four and display as a single tally 💡 */
    renderExceedingCounter(otherMembers)
  }).catch((err) => {
    console.error('Error joining space:', err);
  });
}

function buildUserInfo(member: Member, isSelf: boolean = false): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  const userInfoContainer = document.createElement('div');
  userInfoContainer.className = 'userInfoContainer';
  userInfoContainer.style.backgroundColor = member.profileData.memberColor;
  userInfoContainer.id = 'avatar';

  const userInitials = member.profileData.name
    .split(" ")
    .map((word: string) => word.charAt(0))
    .join("");

  const initials = document.createElement('p');
  initials.className = 'smallText';
  initials.textContent = userInitials;

  userInfoContainer.appendChild(initials);
  wrapper.appendChild(userInfoContainer);

  const userList = document.createElement('div');
  userList.className = 'userList';
  userList.id = 'user-list';

  const nameElement = document.createElement('p');
  nameElement.className = 'name';
  nameElement.textContent = isSelf ? member.profileData.name + ' (You)' : member.profileData.name;

  userList.appendChild(nameElement);
  wrapper.appendChild(userList);

  return wrapper;
}

async function renderAvatar(member: Member, isSelf: boolean = false): Promise<void> {
  const userInitials = member.profileData.name
    .split(" ")
    .map((word: string) => word.charAt(0))
    .join("");

  const avatarsElement = document.getElementById('avatars');
  if (avatarsElement) {
    const avatarElement = document.createElement('div');
    avatarElement.className = isSelf ? 'selfAvatar' : 'otherAvatar';

    const avatarContainer = document.createElement('div');
    avatarContainer.className = 'avatarContainer';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.style.backgroundColor = member.profileData.memberColor;
    avatar.setAttribute('data-member-id', member['clientId']);
    avatar.setAttribute('key', member['clientId']);

    const initials = document.createElement('p');
    initials.className = "textWhite";
    initials.textContent = userInitials;

    avatar.appendChild(initials);

    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.display = 'none';

    const userInfo = buildUserInfo(member, isSelf);
    avatarElement.appendChild(avatarContainer);
    avatarContainer.appendChild(avatar);
    popup.appendChild(userInfo);
    avatar.appendChild(popup);

    avatarsElement.appendChild(avatarElement);

    avatar.addEventListener('mouseover', () => {
      popup.style.display = 'block';
    });

    avatar.addEventListener('mouseleave', () => {
      popup.style.display = 'none';
    });
  }
}

function renderExceedingCounter(otherMembers: SpaceMember[]) {
  console.log('here');
  console.log(otherMembers);
  if (otherMembers.length > 4) {
    const avatarsElement = document.getElementById('avatars');

    if (avatarsElement) {
      const avatarElement = document.createElement('div');
      avatarElement.className = 'avatar';
      avatarElement.style.backgroundColor = '#595959';

      const nameElement = document.createElement('p');
      nameElement.className = 'textWhite nameOthers';
      nameElement.textContent = `+${otherMembers.length - 4}`;

      avatarElement.appendChild(nameElement);
      avatarsElement.appendChild(avatarElement);
    }
  }
}
