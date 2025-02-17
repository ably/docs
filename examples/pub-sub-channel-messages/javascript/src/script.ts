import * as Ably from 'ably';
import { nanoid } from 'nanoid';
import './styles.css';

const client = new Ably.Realtime({
  clientId: nanoid(),
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
});

let headlines = [
  'AI Breakthrough: New Model Achieves Human-Level Understanding in Complex Tasks',
  'SpaceX Successfully Launches 100th Mission to Mars',
  'Quantum Computing Milestone: 1000 Qubit Processor Unveiled',
  'Revolutionary Battery Technology Promises Week-Long Phone Charge',
  'Web4 Protocol Introduces Decentralized Neural Networks',
  'Flying Cars Get FAA Approval for Urban Transportation',
  'Scientists Develop Self-Healing Smartphone Screens',
  'Blockchain Technology Revolutionizes Global Supply Chain',
  'New Chip Architecture Doubles Computing Power While Halving Energy Use',
  'Virtual Reality Breakthrough: Neural Interface Allows Direct Brain Connection',
];

function getHeadlinesRemaining() {
  const headlinesRemaining = document.getElementById('headlines-remaining');
  headlinesRemaining.innerText = `Headlines remaining: ${headlines.length}`;
}

getHeadlinesRemaining();

const urlParams = new URLSearchParams(window.location.search);

const channelName = urlParams.get('name') || 'pub-sub-channel-messages';
const channel = client.channels.get(channelName);
const messagesDiv = document.getElementById('headlines');

channel.subscribe((message) => {
  const newMessage = document.createElement('div');
  const newFlag = document.createElement('span');

  newFlag.className = 'bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold mr-2';
  newFlag.textContent = 'NEW';

  newMessage.className = 'p-3 bg-gray-50 rounded-lg flex items-center gap-2';
  newMessage.appendChild(newFlag);
  const messageText = document.createElement('span');
  messageText.innerText = message.data;
  newMessage.appendChild(messageText);
  messagesDiv.prepend(newMessage);

  setTimeout(() => {
    newFlag.remove();
  }, 5000);
});

const publishButton = document.querySelector('button') as HTMLButtonElement;

publishButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * headlines.length);
  const selectedHeadline = headlines[randomIndex];
  headlines = headlines.filter((_, index) => index !== randomIndex);
  channel.publish('headline', selectedHeadline);

  getHeadlinesRemaining();

  if (headlines.length === 0) {
    publishButton.disabled = true;
    publishButton.className = 'bg-gray-500 text-white px-4 py-2 rounded';
  }
});
