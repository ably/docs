'use client'

import { useState } from 'react';
import Presence from './presence';

export default function Home() {
  const [isJoined, setIsJoined] = useState(false);

  const togglePresence = () => {
    setIsJoined(!isJoined);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Active Viewers</h2>
          <button
            onClick={togglePresence}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isJoined ? 'Leave' : 'Join'}
          </button>
        </div>
        {isJoined && <Presence />}
      </div>
    </div>
  );
}
