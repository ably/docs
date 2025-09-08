import { useEffect, useState } from 'react';
import { useLocations, useMembers, useSpace, SpaceProvider, SpacesProvider } from '@ably/spaces/react';
import { type SpaceMember } from '@ably/spaces';
import Spreadsheet from './components/Spreadsheet';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import Spaces from '@ably/spaces';
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import { config } from './config';
import './styles/styles.css';

type Member = Omit<SpaceMember, 'profileData' | 'location'> & {
  profileData: {
    memberName: string;
    memberColor: string;
  };
  location: {
    row?: number;
    col?: number;
  };
};

type UpdateLocationCallback = (location: Member['location']) => void;

const client = new Realtime({ key: config.ABLY_KEY, clientId: nanoid() });
const spaces = new Spaces(client);

function MemberLocationDemo() {
  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();
  const { self, others } = useMembers();
  const { update } = useLocations();

  /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    space?.enter({
      memberName: `${minifaker.firstName()} ${minifaker.lastName()}`,
      memberColor: minifaker.color(),
    });
  }, [space]);

  return (
    <div id="member-location" className="uk-container uk-padding">
      <Spreadsheet self={self as Member} others={others as Member[]} setLocation={update} />
    </div>
  );
}

export default function App() {
  const [spaceName, setSpaceName] = useState('spaces-member-location');

  useEffect(() => {
    const name = config.SPACE_NAME;

    if (name) {
      setSpaceName(name);
    }
  }, []);

  return (
    <SpacesProvider client={spaces}>
      <SpaceProvider name={spaceName}>
        <MemberLocationDemo />
      </SpaceProvider>
    </SpacesProvider>
  );
}
