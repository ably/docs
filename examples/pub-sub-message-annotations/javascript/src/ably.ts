import * as Ably from 'ably';
import { clientId, channelName } from './config';
import { MessageCreate } from './types';

// Singleton Ably client instance
let client: Ably.Realtime | null = null;

// Lazily creates and returns the Ably client instance with configured clientId
function getClient(): Ably.Realtime {
  if (!client) {
    client = new Ably.Realtime({
      clientId,
      key: import.meta.env.VITE_ABLY_KEY as string,
    });
  }
  return client;
}

// Returns the configured channel with all annotation modes enabled
export function getChannel() {
  return getClient().channels.get(`annotation:${channelName}`, {
    modes: ['PUBLISH', 'SUBSCRIBE', 'ANNOTATION_PUBLISH', 'ANNOTATION_SUBSCRIBE'],
  });
}

// Publishes a new annotation for a specific message
export function publishAnnotation(message: MessageCreate, annotation: Ably.OutboundAnnotation) {
  return getChannel().annotations.publish(message, annotation);
}

// Deletes a specific annotation from a message
export function deleteAnnotation(messageSerial: string, annotation: Ably.OutboundAnnotation) {
  return getChannel().annotations.delete(messageSerial, annotation);
}
