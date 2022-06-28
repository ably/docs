/* eslint-disable no-undef */
window.addEventListener('load', () => {
  window.ably = {
    ...window.ably,
    docs: {
      ably: false,
      resultArea: document.getElementById('result'),
    },
  };
  window.ably.docs.resultArea.scrollTop = window.ably.docs.resultArea.scrollHeight;
  function initClient() {
    const userApiKey = document.getElementById('api-key').value;
    resultArea.value += '[LOCAL LOG - ' + new Date().toLocaleTimeString() + ' ]: Client instantiated\n';
    const ably = new Ably.Realtime(userApiKey);
    const metaChannel = ably.channels.get('[meta]channel.lifecycle');
    metaChannel.subscribe('channel.opened', (msg) => {
      var msgJSONobj = JSON.parse(JSON.stringify(msg.data));
      resultArea.value +=
        '[METADATA - ' +
        new Date().toLocaleTimeString() +
        ' ]: Channel "' +
        msgJSONobj.name +
        '" has been activated globally\n';
      resultArea.scrollTop = resultArea.scrollHeight;
    });
    metaChannel.subscribe('channel.closed', (msg) => {
      var msgJSONobj = JSON.parse(JSON.stringify(msg.data));
      resultArea.value +=
        '[METADATA - ' +
        new Date().toLocaleTimeString() +
        ' ]: Channel "' +
        msgJSONobj.name +
        '" has been deactivated globally\n';
      resultArea.scrollTop = resultArea.scrollHeight;
    });
    metaChannel.subscribe('channel.region.active', (msg) => {
      var msgJSONobj = JSON.parse(JSON.stringify(msg.data));
      resultArea.value +=
        '[METADATA - ' +
        new Date().toLocaleTimeString() +
        ' ]: Channel "' +
        msgJSONobj.name +
        '" has been activated in ' +
        msgJSONobj.region +
        ' region\n';
      resultArea.scrollTop = resultArea.scrollHeight;
    });
    metaChannel.subscribe('channel.region.inactive', (msg) => {
      var msgJSONobj = JSON.parse(JSON.stringify(msg.data));
      resultArea.value +=
        '[METADATA - ' +
        new Date().toLocaleTimeString() +
        ' ]: Channel "' +
        msgJSONobj.name +
        '" has been deactivated in ' +
        msgJSONobj.region +
        ' region\n';
      resultArea.scrollTop = resultArea.scrollHeight;
    });
    window.ably.docs.ably = ably;
  }
  function createChannel() {
    if (!window.ably.docs.ably) {
      alert('You must instantiate a client first');
      return;
    }
    const ably = window.ably.docs.ably;
    var channelName = document.getElementById('create-ch-name').value;
    if (channelName == '') {
      alert('Enter a channel name to attach');
      return;
    } else {
      ably.channels.get(channelName);
      resultArea.value +=
        '[LOCAL LOG - ' +
        new Date().toLocaleTimeString() +
        ' ]: Channel instance obtained for "' +
        channelName +
        '" \n';
      resultArea.scrollTop = resultArea.scrollHeight;
      var chList = document.getElementById('attached-channels');
      chList.options[chList.options.length] = new Option(channelName, channelName);
      var channelInstances = document.getElementById('channel-instances');
      channelInstances.options[channelInstances.options.length] = new Option(channelName, channelName);
    }
  }
  function attachChannel() {
    if (!ably) {
      alert('You must instantiate a client first');
      return;
    }
    var channelsList = document.getElementById('channel-instances');
    var chToAttach = channelsList.options[channelsList.selectedIndex].text;
    var channel = ably.channels.get(chToAttach);
    if (chToAttach == 'None') {
      alert('Select a channel to delete');
    } else {
      channel.attach(() => {
        resultArea.value +=
          '[LOCAL LOG - ' + new Date().toLocaleTimeString() + ' ]: Channel "' + channel.name + '" is now attached\n';
        resultArea.scrollTop = resultArea.scrollHeight;
      });
    }
  }
  function detachChannel() {
    if (!ably) {
      alert('You must instantiate a client first');
      return;
    }
    var channelsList = document.getElementById('attached-channels');
    var chToDetach = channelsList.options[channelsList.selectedIndex].text;
    var channel = ably.channels.get(chToDetach);
    if (chToDetach == 'None') {
      alert('Select a channel to delete');
    } else {
      channel.detach(() => {
        resultArea.value +=
          '[LOCAL LOG - ' + new Date().toLocaleTimeString() + ' ]: Channel "' + channel.name + '" is now detached\n';
        resultArea.scrollTop = resultArea.scrollHeight;
      });
    }
  }

  document.getElementById('init-client').onclick = initClient;
  document.getElementById('create-channel').onclick = createChannel;
  document.getElementById('attach-channel').onclick = attachChannel;
  document.getElementById('detach-channel').onclick = detachChannel;
});
