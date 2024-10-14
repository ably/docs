import React, { useState } from 'react';
import { useRoomReactions } from '@ably/chat/react';
import { Reaction as ReactionInterface } from '@ably/chat';
import '../../styles/styles.css'

export const Reaction = () => {
  const [reactions, setReactions] = useState<ReactionInterface[]>([]);

  const emojis = ['❤️', '😲', '👍', '😊'];

  const { send } = useRoomReactions({
    listener: (reaction) => {
      setReactions((prevReactions: ReactionInterface[]) => [...prevReactions, {...reaction}])

      setTimeout(() => {
        setReactions(prevReactions => prevReactions.filter(r => r.createdAt !== reaction.createdAt));
      }, 4000);
    },
  });

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
            onClick={() => send({type: emoji})}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Reaction;
