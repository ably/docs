import { useEffect, useState } from 'react';
import { useAbly, usePresence, usePresenceListener } from 'ably/react';

interface Viewer {
  clientId: string;
  isOnline: boolean;
}

export default function Presence() {
  const [viewers, setViewers] = useState<Viewer[]>([]);

  const ably = useAbly();
  const currentClientId = ably?.auth.clientId;

  const { presenceData } = usePresenceListener('viewer-presence', (presence) => {
    if (presence.action === 'enter') {
      setViewers(prev => [...prev, { clientId: presence.clientId, isOnline: true }]);
    }
    if (presence.action === 'leave') {
      setViewers(prev => prev.map(viewer =>
        viewer.clientId === presence.clientId
          ? { ...viewer, isOnline: false }
          : viewer
      ));
    }
  });

  useEffect(() => {
    setViewers(presenceData.map(member => ({
      clientId: member.clientId,
      isOnline: true
    })));
  }, [presenceData]);

  usePresence('viewer-presence');

  return (
    <ul className="space-y-2">
      {viewers.map((viewer) => (
        <li key={viewer.clientId} className="flex items-center justify-between p-2 border-b">
          <span>{viewer.clientId}{viewer.clientId === currentClientId ? ' (You)' : ''} </span>
          <span className={`h-3 w-3 rounded-full ${viewer.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></span>
        </li>
      ))}
    </ul>
  );
}
