import './styles.css';
import 'franken-ui/js/core.iife';
import 'franken-ui/js/icon.iife';
import * as Ably from 'ably';
import { getChannel } from './ably';
import { hasSerial } from './types';
import { createMessageElement } from './components/message';
import { updateAnnotationSummary } from './components/summary';
import { addAnnotation } from './components/annotations';

async function main() {
  // Publish regular messages that can be annotated.
  const publishButton = document.getElementById('publish-button');
  publishButton?.addEventListener('click', (e) => {
    e.preventDefault();
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
  getChannel().subscribe((message) => {
    if (!hasSerial(message)) {
      console.error('Received message without serial (this indicates that you need to enable the "Annotations, updates, and deletes" feature in channel rules)');
      return;
    }
    if (message.action === 'message.summary') {
      updateAnnotationSummary(message);
    } else if (message.action === 'message.create') {
      const messageElement = createMessageElement(message);
      document.getElementById('messages')?.appendChild(messageElement);
    }
  });

  // Subscribe to individual annotations (both annotation.create and annotation.delete events)
  // and display them in the raw annotations view
  getChannel().annotations.subscribe((annotation: Ably.Annotation) => {
    addAnnotation(annotation);
  });
}

main().catch(console.error);
