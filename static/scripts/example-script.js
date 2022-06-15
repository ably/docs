function subscribeToCurlRequest(key) {
    var ably = new Ably.Realtime(key),
        channelName = 'bye-eat-cut';
    if (channelName === '{{RANDOM_CHANNEL' + '_NAME}}') { channelName = window.randomChannelName; }
    ably.channels.get(channelName).subscribe('greeting', function(message) {
      alert('That was easy, a message was just received from the REST API on channel "' + channelName + '".\n\nGreeting => ' + message.data);
    });
}

/* API_KEY variable is replaced inline on https://ably.com so
  {{API_KEY}} will not equal '{{API_' + 'KEY}}'
  On docs.ably.com, we rely on application.js to call the onApiKeyRetrieved method */
if ('xVLyHw.d1PUJw:2yLuTwRWA3kLyakvQm8o-oZWRq5fwdUsIOmrVaNmKuY' !== '{{API_' + 'KEY}}') {
  subscribeToCurlRequest('xVLyHw.d1PUJw:2yLuTwRWA3kLyakvQm8o-oZWRq5fwdUsIOmrVaNmKuY');
} else {
  window.onApiKeyRetrieved = subscribeToCurlRequest;
}