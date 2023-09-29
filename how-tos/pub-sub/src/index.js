import Ably from 'ably/promises';

const options = {
  key: 'LNLDWg.I0Jaug:9lhmgpX0hCpxuvOP',
};

const client = new Ably.Realtime(options);

const callback = () => {
  console.log('We are connected to Ably');
};

client.connection.on('connected', callback);
