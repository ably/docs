/* eslint-disable no-undef */
window.addEventListener('load', () => {
  /* Set up a Realtime client that authenticates with the local web server auth endpoint */
  var result = document.getElementById('result');
  result.value += 'On login page now\n';
  function login(e) {
    e.preventDefault();
    result.value += 'Fetching JWT token from auth server\n';
    const realtime = new Ably.Realtime({ authUrl: 'https://ably.com/ably-auth/jwt-token/demos' });
    realtime.connection.once('connected', () => {
      console.log('Client connected to Ably');
      result.value += 'Client connected to Ably using JWT\n';
      alert('Client successfully connected to Ably using JWT auth');
    });
  }
  document.querySelector('p:submit > button').onclick = login;
});
