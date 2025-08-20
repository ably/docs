import * as Ably from 'ably';
import type { Message } from 'ably';
import minifaker from 'minifaker';
import './styles.css';
import { config } from './config';

import 'minifaker/locales/en';

interface MatchOdds {
  match: {
    homeTeam: string;
    awayTeam: string;
    timestamp: number;
    score: string;
    matchOdds: {
      homeWin: string;
      draw: string;
      awayWin: string;
    };
  };
}

let matchData: MatchOdds | null = {
  match: {
    homeTeam: 'Royal Knights',
    awayTeam: 'North Rangers',
    timestamp: Date.now(),
    score: '0-0',
    matchOdds: {
      homeWin: '2.45',
      draw: '3.25',
      awayWin: '2.85',
    },
  },
};

const preloadButton = document.getElementById('pre-load-odds') as HTMLButtonElement;
const urlParams = new URLSearchParams(window.location.search);
const channelName = urlParams.get('name') || 'pub-sub-rewind';
const landingPage = document.getElementById('landing-page');
const game = document.getElementById('game');
let channel: Ably.RealtimeChannel | null = null;

async function enterGame() {
  landingPage.style.display = 'none';
  game.style.display = 'block';

  const client = new Ably.Realtime({
    key: config.ABLY_KEY,
    clientId: minifaker.firstName(),
  });

  channel = client.channels.get(channelName, {
    params: { rewind: '4' },
  });

  channel.subscribe(async (message) => {
    matchData = message.data;
    await addHistoryItem(message);
    await updateCurrentOdds(message);
  });

  await updateRandomOdds();
}

preloadButton.addEventListener('click', async () => {
  preloadButton.disabled = true;
  const client = new Ably.Realtime({
    key: config.ABLY_KEY,
    clientId: minifaker.firstName(),
  });

  const channel = client.channels.get(channelName);

  for (let i = 0; i < 4; i++) {
    const markets = ['homeWin', 'draw', 'awayWin'];
    const numMarketsToUpdate = Math.floor(Math.random() * 2) + 1;
    const marketsToUpdate = markets.sort(() => 0.5 - Math.random()).slice(0, numMarketsToUpdate);

    marketsToUpdate.forEach((market) => {
      matchData.match.matchOdds[market] = (parseFloat(matchData.match.matchOdds[market]) + (Math.random() * 0.2 - 0.1)).toFixed(2);
    });

    matchData.match.timestamp = Date.now();
    await channel.publish('odds', matchData);

    // Show alert for each publish
    const alert = document.createElement('div');
    alert.className =
      'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500';
    alert.textContent = `Update ${i + 1}/4: New odds published`;
    document.body.appendChild(alert);

    // Remove alert after 2 seconds
    setTimeout(() => {
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 2000);

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  await enterGame();
});

async function updateCurrentOdds(message: Message) {
  const score = document.getElementById('score');
  score.textContent = message.data.match.score;
  const currentHome = document.getElementById('current-home');
  currentHome.textContent = message.data.match.matchOdds.homeWin;
  const currentAway = document.getElementById('current-away');
  currentAway.textContent = message.data.match.matchOdds.awayWin;
  const currentDraw = document.getElementById('current-draw');
  currentDraw.textContent = message.data.match.matchOdds.draw;
}

async function addHistoryItem(message: Message, position = 'prepend') {
  const history = document.getElementById('history');
  const historyItem = document.createElement('div');
  historyItem.id = `history-item-${message.id}`;
  historyItem.className = 'border-b pb-2';
  const historyDiv = document.createElement('div');
  historyDiv.className = 'flex justify-between text-sm text-gray-600';
  historyItem.appendChild(historyDiv);

  const homeWin = document.createElement('span');
  homeWin.textContent = `Home: ${message.data.match.matchOdds.homeWin}`;
  const draw = document.createElement('span');
  draw.textContent = `Draw: ${message.data.match.matchOdds.draw}`;
  const awayWin = document.createElement('span');
  awayWin.textContent = `Away: ${message.data.match.matchOdds.awayWin}`;
  const time = document.createElement('span');
  const timestamp = new Date(message.data.match.timestamp);
  time.textContent = `${timestamp.getHours()}:${timestamp.getMinutes().toString().padStart(2, '0')}`;
  historyDiv.appendChild(homeWin);
  historyDiv.appendChild(draw);
  historyDiv.appendChild(awayWin);
  historyDiv.appendChild(time);

  if (position === 'prepend') {
    history.prepend(historyItem);
  } else {
    history.appendChild(historyItem);
  }
}

async function updateRandomOdds() {
  if (!matchData) {
    return;
  }

  for (let i = 0; i < 20; i++) {
    const delayTime = 5000;
    await new Promise((resolve) => setTimeout(resolve, delayTime));

    const markets = ['homeWin', 'draw', 'awayWin'];
    const numMarketsToUpdate = Math.floor(Math.random() * 3) + 1;
    const marketsToUpdate = markets.sort(() => 0.5 - Math.random()).slice(0, numMarketsToUpdate);

    const newOdds = { ...matchData };

    marketsToUpdate.forEach((market) => {
      newOdds.match.matchOdds[market] = (parseFloat(newOdds.match.matchOdds[market]) + (Math.random() * 0.2 - 0.1)).toFixed(2);
    });

    newOdds.match.timestamp = Date.now();
    await channel.publish('odds', newOdds);
  }
}
