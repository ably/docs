import * as Ably from 'ably';
import type { Message } from 'ably';
import { faker } from '@faker-js/faker';
import './styles.css';

const preloadButton = document.getElementById('pre-load-history');
let lastBidAmount = 100;
const numBids = 10;
const urlParams = new URLSearchParams(window.location.search);
const channelName = urlParams.get('name') || 'pub-sub-history';

async function enterAuction() {
  landingPage.style.display = 'none';
  auctionRoom.style.display = 'block';

  client = new Ably.Realtime({
    key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
    clientId: faker.person.firstName(),
  });

  channel = client.channels.get(channelName);

  const currentBid = await retrieveLastBidAmount();
  if (currentBid) {
    await updateCurrentBid(currentBid);
  }

  channel.subscribe('bid', async (message) => {
    if (!message.clientId || !message.data.amount || !message.data.timestamp) {
      console.log('Missing required fields');
      return;
    }

    await addHistoryItem(message);
    await updateCurrentBid(message);
  });
}

preloadButton.addEventListener('click', async () => {
  preloadButton.disabled = true;

  for (let i = 0; i < numBids; i++) {
    const clientId = faker.person.firstName();
    const client = new Ably.Realtime({
      key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
      clientId,
    });
    const channel = client.channels.get(urlParams.get('name') || 'pub-sub-history');
    const bidAmount = (lastBidAmount + Math.random() * 50).toFixed(2);

    await channel.publish('bid', {
      amount: bidAmount,
      timestamp: new Date().toISOString(),
    });

    console.log(`Client ${clientId} placed a bid of $${bidAmount} (previous was $${lastBidAmount})`);
    lastBidAmount = parseFloat(bidAmount);
    client.close();
  }
  await enterAuction();
});

const landingPage = document.getElementById('landing-page');
const auctionRoom = document.getElementById('auction');

let client: Ably.Realtime;
let channel: Ably.RealtimeChannel | null = null;

async function retrieveLastBidAmount() {
  try {
    const resultPage = await channel.history();
    const messages = resultPage.items;
    const messageName = 'bid';
    const filteredMessages = messages.filter((message) => message.name === messageName);

    if (filteredMessages.length > 0) {
      return filteredMessages[0];
    }

    return null;
  } catch (error) {
    console.error('Failed to retrieve message history:', error);
    return null;
  }
}

async function updateCurrentBid(message: Message) {
  const noBidDiv = document.getElementById('no-bids');
  noBidDiv.style.display = 'none';
  const currentBidDiv = document.getElementById('current-bid');
  currentBidDiv.style.display = 'flex';
  const currentBidName = document.getElementById('current-bid-name');
  currentBidName.textContent = message.clientId + (message.clientId === client.auth.clientId ? ' (You)' : '');
  const currentBidAmount = document.getElementById('current-bid-amount');
  currentBidAmount.textContent = `$${Number(message.data.amount).toFixed(2)}`;
  const currentBidTime = document.getElementById('current-bid-time');
  currentBidTime.textContent = new Date(message.data.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

async function addHistoryItem(message: Message, position = 'prepend') {
  const history = document.getElementById('history');
  const historyItem = document.createElement('div');
  historyItem.id = `history-item-${message.id}`;
  historyItem.className = 'flex items-center justify-between';

  if (position === 'prepend') {
    history.prepend(historyItem);
  } else {
    history.appendChild(historyItem);
  }

  const clientId = document.createElement('span');
  clientId.className = 'font-bold w-1/3 text-left';
  clientId.textContent = message.clientId + (message.clientId === client.auth.clientId ? ' (You)' : '');
  historyItem.appendChild(clientId);

  const timestamp = document.createElement('span');
  timestamp.className = 'text-gray-500 w-1/3 text-center';
  timestamp.textContent = new Date(message.data.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  historyItem.appendChild(timestamp);

  const amount = document.createElement('span');
  amount.className = 'text-gray-700 w-1/3 text-right';
  amount.textContent = `$${Number(message.data.amount).toFixed(2)}`;
  historyItem.appendChild(amount);
}

const loadHistoryButton = document.getElementById('load-history') as HTMLButtonElement;

async function addHistory() {
  loadHistoryButton.disabled = true;
  loadHistoryButton.className =
    'bg-gray-500 text-white font-bold uppercase py-3 px-6 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 cursor-not-allowed';
  const resultPage = await channel.history();
  const messages = resultPage.items;
  const filteredMessages = messages.filter((message) => message.name === 'bid');

  const history = filteredMessages
    .slice(0, 10)
    .map((message) => ({
      id: message.id,
      clientId: message.clientId || '',
      data: {
        amount: message.data.amount,
        timestamp: new Date(message.data.timestamp),
      },
    }))
    .filter((newBid) => {
      const itemExists = document.getElementById(`history-item-${newBid.id}`);

      if (!itemExists) {
        return true;
      }
    });

  history.forEach((bid) => {
    addHistoryItem(bid, 'after');
  });
}

loadHistoryButton.addEventListener('click', addHistory);

const placeBidButton = document.getElementById('place-bid');
const bidDialog = document.getElementById('bid-dialog');
const cancelButton = document.getElementById('cancel-bid');
const placeButton = document.getElementById('place-bid-dialog');
const bidInput = document.getElementById('bid-amount') as HTMLInputElement;

placeBidButton.addEventListener('click', () => {
  bidDialog.style.display = 'flex';
});

cancelButton.addEventListener('click', () => {
  bidDialog.style.display = 'none';
  bidInput.value = '';
});

placeButton.addEventListener('click', async () => {
  const bidAmount = Number(bidInput.value);

  if (channel) {
    const lastBidAmount = await retrieveLastBidAmount();

    if (lastBidAmount && bidAmount <= Number(lastBidAmount.data.amount)) {
      alert('Bid amount must be greater than the current bid.');
      return;
    }

    channel.publish('bid', { amount: bidAmount, timestamp: new Date().toISOString() });
  }

  bidDialog.style.display = 'none';
  bidInput.value = '';
});
