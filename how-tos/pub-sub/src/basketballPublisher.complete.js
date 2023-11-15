// Import the Ably library and the publishBasketballScores function from basketballGame.js
import Ably from "ably";
import { publishBasketballScores } from './basketballGame';

// Define the Ably API key and the Ably channel name for basketball scores
const ABLY_API_KEY = import.meta.env.VITE_ABLY_KEY;
const BASKETBALL_CHANNEL_NAME = import.meta.env.VITE_BASKETBALL_CHANNEL_NAME;

// Initialize the Ably client with the API key and get the basketball channel
const client = new Ably.Rest.Promise({
  key: ABLY_API_KEY
});
const basketballChannel = client.channels.get(BASKETBALL_CHANNEL_NAME);

// Function to publish data to the basketball channel
async function publishToAbly(payload) {
  await basketballChannel.publish('scoreUpdate', payload);
  console.log('Publishing message:', payload);
}

// Export the publishToAbly function for use to update a basketballGame
export { publishToAbly };

// Start publishing basketball scores
publishBasketballScores();
