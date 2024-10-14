import React, { useState } from 'react';
import { useRoomReactions } from '@ably/chat/react';
import '../../styles/styles.css'

interface ReactionInterface {
  type: string;
  headers: Record<string, unknown>;
  metadata: object;
  clientId: string;
  createdAt: string;
  isSelf: boolean;
}

export const Reaction = () => {
  const [reactions, setReactions] = useState<ReactionInterface[]>([]);

  const emojis = ['❤️', '😲', '👍', '😊'];

  const { send } = useRoomReactions({
    listener: (reaction) => {
      console.log('Received reaction: ', reaction);
      setReactions((prevReactions: ReactionInterface[]) => [...prevReactions, {...reaction, createdAt: reaction.createdAt.toISOString()}])

      setTimeout(() => {
        setReactions(prevReactions => prevReactions.filter(r => r.createdAt !== reaction.createdAt.toISOString()));      
      }, 4000);
    },
  });

  const handleEmojiClick = (emoji: string) => {
    send({ type: emoji });
  }

  return (
    <div className="reaction-container">
      <div className="reaction-area">
        {reactions.map((reaction, index) => (
          <span key={index} className="reaction">{reaction.type}</span>
        ))}
      </div>
      <div className="emoji-selector">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className="emoji-btn"
            onClick={() => handleEmojiClick(emoji)}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Reaction;