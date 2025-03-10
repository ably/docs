import { useEffect, useState } from 'react';
import { Realtime } from 'ably';
import Spaces from '@ably/spaces';
import { SpaceProvider, SpacesProvider, useMembers, useSpace } from '@ably/spaces/react';
import { nanoid } from 'nanoid';
import { type SpaceMember } from '@ably/spaces';
import { Avatar } from './Avatar';

export type Member = Omit<SpaceMember, 'profileData'> & {
  profileData: { memberColor: string; name: string };
};

const AvatarStack = () => {
  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();

  /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    space?.enter({
      name: 'asd',
      memberColor: '#000000',
    });

    return () => {
      space?.leave();
    };
  }, [space]);

  /** 💡 Get everybody in the space including the local member 💡 */
  const { others, self } = useMembers();
  const hasMoreUsers = others.length > 3;

  return (
    <div className="avatar-stack-container">
      <div className="avatars">
        {/** 💡 Add your avatar to the stack.💡 */}
        {self && (
          <div className="self-avatar" key={self.clientId}>
            <Avatar user={self as Member} isSelf={true} />
          </div>
        )}

        {/** 💡 Stack of first 4 user avatars excluding yourself.💡 */}
        {others.slice(0, 4).map((other) => {
          return (
            <div className="other-avatar" key={other.clientId}>
              <Avatar user={other as Member} isSelf={false} />
            </div>
          );
        })}

        {hasMoreUsers && (
          <div
            className="avatar"
            style={{
              backgroundColor: '#595959',
            }}
          >
            <p className="text-white name-others">+{others.length - 4}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [spaceName, setSpaceName] = useState('spaces-avatar-stack');
  const client = new Realtime({ key: 'JLO6Sw.ySewbQ:aYmoM5VGO4j-aYcZx53iFzHX9Get2WK20Peruic3D5o', clientId: nanoid() });
  const spaces = new Spaces(client);

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
        <AvatarStack />
      </SpaceProvider>
    </SpacesProvider>
  );
};

export default App;
