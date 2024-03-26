// Import Ably
import Ably from 'ably';

// Import the function responsible for publishing football scores.
import { publishFootballScores } from './footballGame';

// Get the Ably API key from the environment variables.
const ABLY_API_KEY = import.meta.env.VITE_ABLY_KEY;

// Define the name of the Ably channel used for football scores.
export const FOOTBALL_CHANNEL_NAME = import.meta.env.VITE_FOOTBALL_CHANNEL_NAME;

// Create an Ably client instance with the provided API key.
const client = new Ably.Rest({
  key: ABLY_API_KEY,
});

// Get the Ably channel associated with football scores.
const footballChannel = client.channels.get(FOOTBALL_CHANNEL_NAME);

// Async function to publish football scores to Ably.
async function publishToAbly(footballLeague, payload) {
  // Use Ably's publish method to send the score data to the specified league.
  await footballChannel.publish(footballLeague, payload);
  console.log('Publishing message:', payload);
}

// Export the function for publishing football scores to Ably.
export { publishToAbly };

// Start the process of publishing football scores.
publishFootballScores();
