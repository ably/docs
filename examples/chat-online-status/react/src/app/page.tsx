"use client";

import React, { useEffect, useState } from 'react';
import { useChatClient, useRoom, usePresenceListener, usePresence } from '@ably/chat/react';
import { PresenceEvent } from '@ably/chat';
import '../../styles/styles.css';

interface OnlineStatus {
  status: string;
}

export default function Home() {
  const { roomStatus, connectionStatus } = useRoom();

  if (roomStatus !== 'attached' || connectionStatus !== 'connected') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Online />
    </div>
  );
}

const Online = () => {
  const [onlineStatuses, setOnlineStatuses] = useState<PresenceEvent[]>([]);
  const { presenceData, error } = usePresenceListener({
    listener: (presence) => {
      if (presence.action === 'enter') {
        setOnlineStatuses((prevStatus: PresenceEvent[]) => [...prevStatus, presence as PresenceEvent]);
      } else if (presence.action === 'leave') {
        setOnlineStatuses((prevStatus: PresenceEvent[]) => prevStatus.filter((status: PresenceEvent) => status.clientId !== presence.clientId));
      }
    },
  });

  const { clientId } = useChatClient();

  useEffect(() => {
    if (presenceData) {
      setOnlineStatuses(presenceData.map(member => ({
        ...member,
        timestamp: new Date().getTime()
      })) as PresenceEvent[]);
    }
  }, [presenceData]);

  const { update } = usePresence({
    enterWithData: { status: 'Online' },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Live user status</h2>
      <div className="space-y-4">
        {onlineStatuses.map((onlineStatus) => (
          <div
            key={onlineStatus.clientId}
            className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div
              className={`w-4 h-4 mr-3 rounded-full ${
                (onlineStatus.data as OnlineStatus)?.status === 'Away' ? 'bg-amber-500' : 'bg-green-500'}`}
            ></div>
            <div>
              <p className="font-medium text-gray-900">
                {onlineStatus.clientId}{onlineStatus.clientId === clientId ? ' (You)' : ''}
              </p>
                <p className="text-sm italic text-gray-600">
                  {(onlineStatus.data as OnlineStatus)?.status ?? 'Online'}
                </p>
            </div>
          </div>
        ))}
        {onlineStatuses
          .filter(status => status.clientId === clientId)
          .map(userStatus => (
            <button
              key={clientId}
              className="away-button w-32"
              onClick={async () =>
                await update({
                  status: (userStatus.data as OnlineStatus)?.status === 'Away' ? 'Online' : 'Away'
                })
              }
            >
              {(userStatus.data as OnlineStatus)?.status === 'Away' ? 'Show online' : 'Set away'}
            </button>
          ))
        }
      </div>
    </div>
  );
}
