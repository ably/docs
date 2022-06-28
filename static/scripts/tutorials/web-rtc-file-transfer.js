/* eslint-disable no-undef */
window.addEventListener('load', function () {
  var urlParams = new URLSearchParams(location.search);
  var channelName = urlParams.has('channel')
    ? urlParams.get('channel')
    : 'fileChannel-' + Math.random().toString(36).substr(2, 16);
  /* Set up the link to open a new window with this random channel name */
  var base = 'https://ablyfiletransfer.herokuapp.com/';
  var urlWithChannel = document.location.href.replace(/#.*$/, '');
  if (urlWithChannel.indexOf('channel=') < 0) {
    base += (urlWithChannel.indexOf('?') < 0 ? '?' : '&') + 'channel=' + escape(channelName);
  }
  $('a#new-browser').attr('href', base);
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', base);
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '400px');
  iframe.setAttribute('allow', 'geolocation; microphone; camera');
  document.getElementById('lvideo').appendChild(iframe);
});
