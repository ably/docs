import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider, useAbly, usePresence, usePresenceListener } from 'ably/react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { useState } from 'react';
import { config } from './config';
import './styles/styles.css';

const client = new Realtime({ key: config.ABLY_KEY, clientId: minifaker.firstName() });
const urlParams = new URLSearchParams(window.location.search);
const channelName = urlParams.get('name') || 'pub-sub-presence';

function PresenceList() {
  const [status, setStatus] = useState('Online');
  const ably = useAbly();
  const currentClientId = ably?.auth.clientId;

  const { presenceData } = usePresenceListener(channelName);
  const { updateStatus } = usePresence(channelName, 'Online');

  return (
    <div className="min-h-screen p-8 uk-text-primary">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-2">
          {presenceData.map((viewer) => (
            <li key={viewer.clientId} className="flex items-center justify-between p-2 border-b">
              <div className="flex flex-col">
                <span>
                  {viewer.clientId}
                  {viewer.clientId === currentClientId ? ' (You)' : ''}{' '}
                </span>
                <span className="italic text-sm text-gray-500">{viewer.data}</span>
              </div>
            </li>
          ))}
        </div>
        <div className="flex mt-8 space-x-2">
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Update your status"
            className="uk-input uk-width-1-1 uk-border-rounded-left"
          />
          <button
            key={currentClientId}
            onClick={() => {
              updateStatus(status);
            }}
            className="uk-btn uk-btn-primary rounded-[1998px] hover:uk-btn-primary+1 active:uk-btn-primary+2 whitespace-nowrap"
            disabled={!status.trim()}
          >
            Update status
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelName}>
        <PresenceList />
      </ChannelProvider>
    </AblyProvider>
  );
}

export default App;
