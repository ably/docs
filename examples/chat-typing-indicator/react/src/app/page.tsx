"use client";

import { useRoom } from '@ably/chat/react';
import { ChatInput } from '../components/ChatInput';
import '../../public/styles/styles.css'

export default function ChatApp() {
  const { roomStatus, connectionStatus } = useRoom();

  if (roomStatus !== 'attached' || connectionStatus !== 'connected') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ChatInput />
    </div>
  );
}
