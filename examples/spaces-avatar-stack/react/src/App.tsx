import { useEffect, useState } from 'react';
import { useMembers, useSpace, SpaceProvider, SpacesProvider } from '@ably/spaces/react';
import { type SpaceMember } from '@ably/spaces';
import { Avatar } from './components/Avatar';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import Spaces from '@ably/spaces';
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import { config } from './config';
import './styles/styles.css';

export type Member = Omit<SpaceMember, 'profileData'> & {
  profileData: { memberColor: string; name: string };
};

const client = new Realtime({ key: config.ABLY_KEY, clientId: nanoid() });
const spaces = new Spaces(client);

function AvatarStack() {
  const { space } = useSpace();

  useEffect(() => {
    space?.enter({
      name: minifaker.firstName() + ' ' + minifaker.lastName(),
      memberColor: minifaker.color(),
    });

    return () => {
      space?.leave();
    };
  }, [space]);

  const { others, self } = useMembers();
  const hasMoreUsers = others.length > 3;

  return (
    <div className="min-h-screen flex items-center justify-center uk-text-primary">
      <div className="flex items-center space-x-[-8px]">
        {self && (
          <div className="relative" key={self.clientId}>
            <Avatar user={self as Member} isSelf={true} />
          </div>
        )}

        {others.slice(0, 4).map((other) => {
          return (
            <div className="relative z-10" key={other.clientId}>
              <Avatar user={other as Member} isSelf={false} />
            </div>
          );
        })}

        {hasMoreUsers && (
          <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-600 relative z-20">
            <p className="text-white text-sm">+{others.length - 4}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [spaceName, setSpaceName] = useState('spaces-avatar-stack');

  useEffect(() => {
    const name = config.SPACE_NAME;
    if (name) {
      setSpaceName(name);
    }
  }, []);

  return (
    <SpacesProvider client={spaces}>
      <SpaceProvider name={spaceName}>
        <AvatarStack />
      </SpaceProvider>
    </SpacesProvider>
  );
}
