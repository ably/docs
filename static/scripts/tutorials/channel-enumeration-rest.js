/* eslint-disable no-undef */
const authUrl = 'https://ably.com/ably-auth/token/docs';

const resultArea = document.getElementById('result');
//request a list of channels on button click

window.addEventListener('load', () => {
  window.ably = {
    ...window.ably,
    docs: {
      channelCount: 0,
    },
  };
  function handleResultPage(err, resultPage) {
    let channelCount = window.ably.docs.channelCount;
    if (err || !resultPage.success) {
      resultArea.value += 'An error occurred; err = ' + (err || resultPage.errorMessage);
      return;
    }
    if (channelCount === 0) {
      if (resultPage.items.length == 0) {
        resultArea.value += 'Your app does not have any active channels\n';
        return;
      }
      resultArea.value += 'Your app has the following active channels:\n';
    }
    resultPage.items.forEach(function (channel) {
      resultArea.value += ++window.ably.docs.channelCount + '. ' + channel + '\n';
    });
    if (resultPage.hasNext()) {
      resultPage.next(handleResultPage);
    }
  }
  function enumerateChannels() {
    const endpoint = '/channels';
    resultArea.value += 'Enumerating channels ...\n';
    const ably = new Ably.Rest({ authUrl: authUrl });
    ably.request('get', endpoint, { limit: 100, by: 'id' }, null, null, handleResultPage);
  }
  document.getElementById('enumerate').onclick = enumerateChannels;
});
