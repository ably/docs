// Import necessary functions and constants from the basketballPublisher
import { publishToAbly } from './basketballPublisher';

// Sandpack friendliness
import { shouldRunPublisher } from './utils';

// Define an array of basketball team names
const basketballTeams = ['Ether Flyers', 'Fire Hawks', 'Ten Points Club', 'Solar Flares'];

// Set the interval for score updates (in milliseconds)
const SCORE_UPDATE_INTERVAL = 1000;

// Initialize basketball games with team information and scores
const basketballGames = [
  {
    id: "match-1",
    duration: 135,
    home: {
      name: basketballTeams[0],
      score: 0
    },
    away: {
      name: basketballTeams[1],
      score: 0
    }
  },
  {
    id: "match-2",
    duration: 135,
    home: {
      name: basketballTeams[2],
      score: 0
    },
    away: {
      name: basketballTeams[3],
      score: 0
    }
  }
];

// Function to get a random element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to update basketball scores for a game
function updateBasketballScore(basketballGame) {
  const possiblePoints = [1, 2, 3, 4];

  // Determine which team scores (home or away)
  const teamToScore = Math.floor(Math.random() * 2) === 0 ? 'home' : 'away';

  // Increment the team's score by a random point value, which represents how much the score
  basketballGame[teamToScore].score += getRandomElement(possiblePoints);

  return basketballGame;
}

// Function to publish a basketball game score to Ably
async function publishBasketballGameScore(basketballGame) {
  const basketballScorePayload = updateBasketballScore(basketballGame);

  basketballGame.duration--;

  // Publish the updated score to Ably using the publishToAbly function
  await publishToAbly(basketballScorePayload);

  // Schedule another update if the game is still ongoing
  if (basketballGame.duration >= 0) {
    setTimeout(() => publishBasketballGameScore(basketballGame), SCORE_UPDATE_INTERVAL);
  }
}

// Function to initiate the score updates for all basketball games
async function publishBasketballScores() {
  if (shouldRunPublisher()) {
    for (const basketballGame of basketballGames) {
      // Start publishing scores for each game
      publishBasketballGameScore(basketballGame);
    }
  }
}

// Export the publishBasketballScores function which is called from the basketballPublisher
export { publishBasketballScores };
