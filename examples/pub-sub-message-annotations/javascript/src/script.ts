import './styles.css';
import * as Ably from 'ably';
import { getChannel } from './ably';
import { MessageSummary, MessageCreate } from './types';
import { addMessage } from './components/message';
import { updateAnnotationSummary } from './components/summary';

async function main() {
  // Publish regular messages that can be annotated.
  const publishButton = document.getElementById('publish-button');
  publishButton?.addEventListener('click', () => {
    const messageInput = document.getElementById('message-input') as HTMLInputElement;
    const message = messageInput.value.trim();
    if (message) {
      getChannel().publish('message', message);
      messageInput.value = '';
    }
  });

  // Subscribe to messages.
  // We will receive a message.summary event when an annotation is published
  // and a new summary is available.
  // Regular messages will be received as message.create events.
  getChannel().subscribe((message: Ably.Message) => {
    if (message.action === 'message.summary') {
      updateAnnotationSummary(message as MessageSummary);
    } else if (message.action === 'message.create') {
      addMessage(message as MessageCreate);
    }
  });
}

main().catch(console.error);
