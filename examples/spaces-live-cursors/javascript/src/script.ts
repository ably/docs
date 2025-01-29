import Spaces, { type SpaceMember } from '@ably/spaces';
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import { createCursorSvg } from './CursorSvg';

export type Member = Omit<SpaceMember, 'profileData'> & {
  profileData: { userColors: { cursorColor: string }; name: string };
};

interface CursorPosition {
  left: number;
  top: number;
  state: string;
}
const mockNames = ['Chris Evans', 'Scarlett Johansson', 'Robert Downey Jr.'];
const colors: string[] = ['#9951F5', '#f1c232', '#f44336'];

connect();

function trackCursor(parentRef: HTMLDivElement, updatePosition: (position: CursorPosition) => void) {
  return (event: MouseEvent) => {
    const rect = parentRef.getBoundingClientRect();
    const position = {
      left: event.clientX - rect.left,
      top: event.clientY - rect.top,
      state: 'move',
    };
    updatePosition(position);
  };
}

async function connect() {
  const client = new Realtime({
    clientId: nanoid(),
    key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
  });

  const urlParams = new URLSearchParams(window.location.search);
  const spaceName = urlParams.get('name') || 'spaces-live-cursors';
  const spaces = new Spaces(client);
  const space = await spaces.get(spaceName);
  const parentRef = document.getElementById('live-cursors');
  if (!parentRef || !(parentRef instanceof HTMLDivElement)) {
    return;
  }

  await space.enter({
    name: mockNames[Math.floor(Math.random() * mockNames.length)],
    userColors: { cursorColor: colors[Math.floor(Math.random() * colors.length)] },
  });

  space.cursors.subscribe('update', async (cursorUpdate) => {
    const members = await space.members.getAll();
    const member = members.find((member) => member.connectionId === cursorUpdate.connectionId);

    if (member === null || !member) {
      return;
    }
    if (cursorUpdate.data?.['state'] === 'leave') {
      const existingCursor = document.getElementById(`member-cursor-${member.connectionId}`);
      existingCursor?.remove();

      return;
    }

    const existingCursor = document.getElementById(`member-cursor-${member.connectionId}`);

    if (existingCursor) {
      existingCursor.style.left = `${cursorUpdate.position.x}px`;
      existingCursor.style.top = `${cursorUpdate.position.y}px`;
      return;
    }

    const cursorColor = member?.profileData?.['userColors'] as { cursorColor: string } | undefined;
    const cursorContainer = document.getElementById('live-cursors');
    const memberCursorContainer = document.createElement('div');
    memberCursorContainer.setAttribute('key', member.connectionId);
    memberCursorContainer.setAttribute('id', `member-cursor-${member.connectionId}`);
    memberCursorContainer.className = 'cursor';
    memberCursorContainer.style.left = `${cursorUpdate.position.x}px`;
    memberCursorContainer.style.top = `${cursorUpdate.position.y}px`;
    memberCursorContainer.innerHTML = createCursorSvg(cursorColor?.cursorColor || '').outerHTML;

    const cursorNameContainer = document.createElement('div');
    cursorNameContainer.className = 'cursor-name member-cursor';
    cursorNameContainer.style.backgroundColor = cursorColor?.cursorColor || '';
    cursorNameContainer.textContent = member?.profileData?.['name'] || '';
    memberCursorContainer.appendChild(cursorNameContainer);
    cursorContainer?.appendChild(memberCursorContainer);
  });

  const updateCursorPosition = async (position: CursorPosition) => {
    await space.cursors.set({ position: { x: position.left, y: position.top } });
  };

  const handleMouseLeave = async (event: MouseEvent) => {
    await space.cursors.set({
      position: { x: 0, y: 0 },
      data: { state: 'leave' },
    });
  };

  const handleCursorMove = trackCursor(parentRef, updateCursorPosition);
  parentRef.addEventListener('mousemove', handleCursorMove);
  parentRef.addEventListener('mouseleave', handleMouseLeave);
}
