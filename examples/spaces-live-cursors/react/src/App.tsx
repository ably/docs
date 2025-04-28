import { YourCursor, MemberCursors } from './components/LiveCursors';
import { useMemo, useRef, useEffect, useState } from 'react';
import { useMembers, useSpace, SpaceProvider, SpacesProvider } from '@ably/spaces/react';
import type { SpaceMember } from '@ably/spaces';
import Spaces from '@ably/spaces';
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import './styles/styles.css';

export type Member = Omit<SpaceMember, 'profileData'> & {
  profileData: { userColors: { cursorColor: string }; name: string };
};

export const mockNames = ['Dane Mills', 'Sam Mason', 'Najla Karam'];

export const colors = [{ cursorColor: '#6366f1' }, { cursorColor: '#8b5cf6' }, { cursorColor: '#ec4899' }];

/** 💡 Select a mock name to assign randomly to a new user that enters the space💡 */
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

const client = new Realtime({ key: import.meta.env.VITE_ABLY_KEY, clientId: nanoid() });
const spaces = new Spaces(client);

function LiveCursorsDemo() {
  const name = useMemo(mockName, []);
  /** 💡 Select a color to assign randomly to a new user that enters the space💡 */
  const userColors = useMemo(() => colors[Math.floor(Math.random() * colors.length)], []);

  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();

  useEffect(() => {
    space?.enter({ name, userColors });
  }, [space, name, userColors]);

  const { self } = useMembers();
  const liveCursors = useRef(null);

  return (
    <div
      id="live-cursors"
      ref={liveCursors}
      className="uk-container min-h-screen flex items-center justify-center bg-gray-50 relative uk-text-primary"
    >
      <p className="uk-text-lead text-center absolute top-8 left-1/2 transform -translate-x-1/2">
        Move your cursor over the screen to see live cursors in action
      </p>
      <YourCursor self={self as Member | null} parentRef={liveCursors} />
      <MemberCursors />
    </div>
  );
}

export default function App() {
  const [spaceName, setSpaceName] = useState('spaces-live-cursors');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name) {
      setSpaceName(name);
    }
  }, []);

  return (
    <SpacesProvider client={spaces}>
      <SpaceProvider name={spaceName}>
        <LiveCursorsDemo />
      </SpaceProvider>
    </SpacesProvider>
  );
}
