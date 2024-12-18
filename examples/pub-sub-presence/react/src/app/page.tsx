'use client'

import { useEffect, useState } from 'react';
import { useAbly, usePresence, usePresenceListener } from 'ably/react';

interface Viewer {
  clientId: string;
  isOnline: boolean;
}

export default function Home() {
  const [viewers, setViewers] = useState<Viewer[]>([]);

  const ably = useAbly();
  const currentClientId = ably?.auth.clientId;

  usePresenceListener('viewer-presence', (presence) => {
    switch (presence.action) {
      case 'enter':
        setViewers(prev => [...prev, { clientId: presence.clientId, isOnline: true }]);
        break;
      case 'update':
        setViewers(prev => prev.map(viewer => {
          return viewer.clientId === presence.clientId
            ? { ...viewer, isOnline: presence.data === 'Online' }
            : viewer
        }));
        break;
      case 'leave':
        setViewers(prev => prev.filter(viewer => viewer.clientId !== presence.clientId));
        break;
    }
  });


  const { updateStatus } = usePresence('viewer-presence', 'Online');

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">User List</h2>
        <div className="space-y-2">
          {viewers.map((viewer) => (
            <li key={viewer.clientId} className="flex items-center justify-between p-2 border-b">
              <span>{viewer.clientId}{viewer.clientId === currentClientId ? ' (You)' : ''} </span>
              <span className={`h-3 w-3 rounded-full ${viewer.isOnline ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            </li>
          ))}
        </div>
        <div className="mt-8">
          {viewers
            .filter(viewer => viewer.clientId === currentClientId)
            .map(viewer => (
              <button
                key={currentClientId}
                className="w-32 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  updateStatus(viewer.isOnline ? 'Away' : 'Online');
                }}
              >
                {viewer.isOnline ? 'Set away' : 'Set online'}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}
