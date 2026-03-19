import Ably from 'ably';

type MessagePredicate = (message: Ably.Message) => boolean;

/**
 * Wait for a message matching the predicate on the given channel.
 * Resolves with the first matching message, or rejects on timeout.
 */
export async function waitForMessage(
  channel: Ably.RealtimeChannel,
  predicate: MessagePredicate = () => true,
  timeoutMs = 5000,
): Promise<Ably.Message> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      channel.unsubscribe(listener);
      reject(new Error(`waitForMessage timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    const listener = (message: Ably.Message) => {
      if (predicate(message)) {
        clearTimeout(timer);
        channel.unsubscribe(listener);
        resolve(message);
      }
    };

    channel.subscribe(listener);
  });
}
