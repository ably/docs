'use client'

import { useAbly, usePresence, usePresenceListener } from 'ably/react';
import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('Online');
  const ably = useAbly();
  const currentClientId = ably?.auth.clientId;
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : {});

  const { presenceData } = usePresenceListener(urlParams.get('name') || 'pub-sub-presence');
  const { updateStatus } = usePresence(urlParams.get('name') || 'pub-sub-presence', 'Online');

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">User list</h2>
        <div className="space-y-2">
          {presenceData.map((viewer) => (
            <li key={viewer.clientId} className="flex items-center justify-between p-2 border-b">
              <div className="flex flex-col">
                <span>{viewer.clientId}{viewer.clientId === currentClientId ? ' (You)' : ''} </span>
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
            className="uk-btn uk-btn-primary uk-border-rounded-right whitespace-nowrap"
            disabled={!status.trim()}
          >
            Update status
          </button>
        </div>
      </div>
    </div>
  );
}
