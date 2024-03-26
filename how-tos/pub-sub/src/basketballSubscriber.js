import Ably from "ably";

// Define the Ably API key and the Ably channel name for basketball scores
const ABLY_API_KEY = import.meta.env.VITE_ABLY_KEY;
const BASKETBALL_CHANNEL_NAME = import.meta.env.VITE_BASKETBALL_CHANNEL_NAME;

// Initialize the Ably client with the API key and get the basketball channel
const client = new Ably.Realtime({
  key: ABLY_API_KEY
});
const basketballChannel = client.channels.get(BASKETBALL_CHANNEL_NAME);

// Function to subscribe to the basketball channel
export const subscribeToBasketball = (setSubscribedChannels, setBasketballScores) => {
  // Subscribe to the basketball channel
  basketballChannel.subscribe((message) => {
    // Handle incoming messages from the basketball channel
    const newScoreUpdate = message.data;

    // Update the basketball scores in your application state
    setBasketballScores((prevScores) => ({
      ...prevScores,
      [newScoreUpdate.id]: `${newScoreUpdate.home.score} - ${newScoreUpdate.away.score}`,
    }));
  });

  // Update the list of subscribed channels
  setSubscribedChannels((previousChannels) => [...previousChannels, 'basketball']);
};

// Function to unsubscribe from the basketball channel
export const unsubscribeFromBasketball = (setSubscribedChannels) => {

  // Unsubscribe from the basketball channel
  basketballChannel.unsubscribe();

  // Update the list of subscribed channels to remove 'basketball'
  setSubscribedChannels((previousChannels) =>
    previousChannels.filter((channel) => channel !== 'basketball')
  );
};
