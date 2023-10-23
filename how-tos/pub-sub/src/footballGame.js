// Import the function to publish data to Ably
import { publishToAbly } from './footballPublisher';

// Define the interval (in milliseconds) for updating scores.
const SCORE_UPDATE_INTERVAL = 1000;

// Define an array of football teams.
const footballTeams = ['Vortex United', 'Lioners', 'Enemy Titans', 'Soccer Wolves'];

// Define an array of football games with initial data.
const footballGames = [
  {
    league: 'greenLeague',
    duration: 90,
    home: {
      name: footballTeams[0],
      score: 0,
    },
    away: {
      name: footballTeams[1],
      score: 0,
    },
  },
  {
    league: 'blueLeague',
    duration: 90,
    home: {
      name: footballTeams[2],
      score: 0,
    },
    away: {
      name: footballTeams[3],
      score: 0,
    },
  },
];

// Helper function to get a random element from an array.
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Function to update the football game score.
function updateFootballScore(footballGame) {
  const possibleGoals = [0, 1];

  // Randomly choose the team that scores.
  const teamToScore = Math.floor(Math.random() * 2) === 0 ? 'home' : 'away';

  // Update the score for the selected team.
  footballGame[teamToScore].score += getRandomElement(possibleGoals);

  return footballGame;
}

// Async function to publish the football game score and continue until the game duration reaches 0.
async function publishFootballGameScore(footballGame) {
  const footballScorePayload = updateFootballScore(footballGame);

  // Decrease the remaining game duration.
  footballGame.duration--;

  // Publish the updated score to Ably.
  await publishToAbly(footballGame.league, footballScorePayload);

  // Check if the game is over
  if (footballGame.duration >= 0) {
    // Schedule the next score update using a timeout.
    setTimeout(() => publishFootballGameScore(footballGame), SCORE_UPDATE_INTERVAL);
  }
}

// Async function to publish scores for all football games.
async function publishFootballScores() {
  for (const footballGame of footballGames) {
    publishFootballGameScore(footballGame);
  }
}

// Export the function that starts publishing football scores.
export { publishFootballScores };
