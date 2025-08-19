import { useEffect, useState } from 'react';
import { AblyProvider, ChannelProvider } from 'ably/react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { nanoid } from 'nanoid';
import { Realtime } from 'ably';
import { SpaceProvider, SpacesProvider, useSpace } from '@ably/spaces/react';
import Spaces from '@ably/spaces';
import type { SpaceMember } from '@ably/spaces';
import { AblyPoweredInput } from './components/AblyPoweredInput';
import { config } from './config';
import './styles/styles.css';

const client = new Realtime({ key: config.ABLY_KEY, clientId: nanoid() });
const spaces = new Spaces(client);

export type Member = Omit<SpaceMember, 'profileData'> & {
  profileData: { memberColor: string; memberName: string };
};

const entries = [
  { label: 'Entry 1', name: 'entry1' },
  { label: 'Entry 2', name: 'entry2' },
  { label: 'Entry 3', name: 'entry3' },
];

function ComponentLocking() {
  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();

  /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    space?.enter({
      memberName: `${minifaker.firstName()} ${minifaker.lastName()}`,
      memberColor: minifaker.color(),
    });
  }, [space]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 uk-text-primary">
      <div className="flex flex-col space-y-4 w-full max-w-md">
        {entries.map((entry) => {
          return (
            <ChannelProvider
              channelName={`component-locking-${entry.name}`}
              key={entry.name}
              options={{ params: { rewind: '1' } }}
            >
              <AblyPoweredInput key={entry.name} label={entry.label} name={entry.name} />
            </ChannelProvider>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [spaceName, setSpaceName] = useState('spaces-component-locking');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name) {
      setSpaceName(name);
    }
  }, []);

  return (
    <AblyProvider client={client}>
      <SpacesProvider client={spaces}>
        <SpaceProvider name={spaceName}>
          <ComponentLocking />
        </SpaceProvider>
      </SpacesProvider>
    </AblyProvider>
  );
}
