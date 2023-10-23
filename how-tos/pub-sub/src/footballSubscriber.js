// Import Ably
import Ably from 'ably';

// Get the Ably API key from environment variables
const ABLY_API_KEY = import.meta.env.VITE_ABLY_KEY;

// Define the name of the Ably channel used for football scores.
const FOOTBALL_CHANNEL_NAME = import.meta.env.VITE_ABLY_FOOTBALL_CHANNEL_NAME;

// Create an Ably client instance with the provided API key
const client = new Ably.Realtime.Promise({
  key: ABLY_API_KEY,
});

// Get the Ably channel associated with football scores for subscribing and unsubscribing.
const footballChannel = client.channels.get(FOOTBALL_CHANNEL_NAME);

// Function to subscribe to a specific football league's updates.
export const subscribeToFootballLeague = (setSubscribedChannels, setFootballScores, footballLeague) => {
  // Subscribe to the specified channel (footballLeague).
  footballChannel.subscribe(footballLeague, (message) => {
    // Handle incoming messages from the football channel, which represent score updates.
    const newScoreUpdate = message.data;

    // Update the football scores in the UI state.
    setFootballScores((prevScores) => ({
      ...prevScores,
      [newScoreUpdate.league]: `${newScoreUpdate.home.score} - ${newScoreUpdate.away.score}`,
    }));
  });

  // Update the list of subscribed channels.
  setSubscribedChannels((previousChannels) => [...previousChannels, footballLeague]);
};

// Function to unsubscribe from a specific football league's updates.
export const unsubscribeFromFootballLeague = (setSubscribedChannels, footballLeague) => {
  // Unsubscribe from the specified channel (footballLeague).
  footballChannel.unsubscribe(footballLeague);

  // Update the list of subscribed channels by removing the unsubscribed channel.
  setSubscribedChannels((previousChannels) =>
    previousChannels.filter((channel) => channel !== footballLeague)
  );
};

