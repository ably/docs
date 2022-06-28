// for: content/api-streamer/examples.textile
/* eslint-disable no-undef */

window.ably = {
  ...window.ably,
  docs: {
    DOCS_API_KEY: false,
    RANDOM_CHANNEL_NAME: false,
    onApiKeyRetrieved: () => {},
  },
};

function subscribeToCurlRequest(key) {
  var ably = new Ably.Realtime(key);
  if (!window.ably.RANDOM_CHANNEL_NAME) {
    channelName = window.randomChannelName;
  }
  ably.channels.get(channelName).subscribe('greeting', function (message) {
    alert(
      'That was easy, a message was just received from the REST API on channel "' +
        channelName +
        '".\n\nGreeting => ' +
        message.data,
    );
  });
}

if (window.ably.docs.DOCS_API_KEY) {
  subscribeToCurlRequest(window.ably.docs.DOCS_API_KEY);
} else {
  window.ably.docs.onApiKeyRetrieved = subscribeToCurlRequest;
}
