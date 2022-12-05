/* eslint-disable no-undef */
window.addEventListener('load', function () {
  var ably = new Ably.Realtime({ authUrl: 'https://ably.com/ably-auth/token/docs' }),
    channelName = getQueryParam('channel') || getRandomChannelName(),
    channel = ably.channels.get(channelName),
    $result = $('#result');

  ably.connection.on('connecting', function () {
    log('[Connecting to Ably...]');
  });

  ably.connection.on('connected', function () {
    log('[Connected to Ably] Waiting for messages...');
  });

  channel.subscribe(function (msg) {
    log('[Received] ' + msg.data);
  });

  $('button#send-message').on('click', function () {
    var text = $('input#message-text').val();
    log('[Publishing...] ' + text);
    channel.publish('msg', text);
  });

  /* Set up the link to open a new window with this random channel name */
  var urlWithChannel = document.location.href.replace(/#.*$/, '');
  if (urlWithChannel.indexOf('channel=') < 0) {
    urlWithChannel += (urlWithChannel.indexOf('?') < 0 ? '?' : '&') + 'channel=' + escape(channelName);
  }
  $('a#new-browser').attr('href', urlWithChannel + '#live-demo');

  var started = new Date().getTime();
  function log(msg) {
    var timePassed = Math.round((new Date().getTime() - started) / 100) / 10;
    $result.text(timePassed + 's - ' + msg + '\n' + $result.text());
  }
});
