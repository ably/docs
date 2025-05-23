import * as Ably from 'ably';
import { clientId, channelName } from './config';
import { MessageCreate } from './types';

let client: Ably.Realtime | null = null;

function getClient(): Ably.Realtime {
  if (!client) {
    client = new Ably.Realtime({
      clientId,
      key: import.meta.env.VITE_ABLY_KEY as string,
    });
  }
  return client;
}

export function getChannel() {
  return getClient().channels.get(channelName, {
    modes: ['PUBLISH', 'SUBSCRIBE', 'ANNOTATION_PUBLISH', 'ANNOTATION_SUBSCRIBE'],
  });
}

export function publishAnnotation(message: MessageCreate, annotation: Ably.OutboundAnnotation) {
  return getChannel().annotations.publish(message, annotation);
}
