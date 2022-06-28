/* eslint-disable no-undef */
window.addEventListener('load', function () {
  var started,
    $output = $('#output'),
    $togglePresence = $('button#toggle-presence'),
    inPresenceSet = false,
    $name = $('input#name'),
    $connectBtn = $('#connect-to-ably'),
    channelName = getQueryParam('channel') || getRandomChannelName();

  $name.val(getRandomName());

  $('#connect-to-ably').on('click', function () {
    var name = $.trim($name.val());
    if (!name) {
      log('You need to enter your name before you can enter presence');
      return;
    }

    (started = new Date().getTime()),
      (ably = new Ably.Realtime({
        clientId: name,
        authUrl: 'https://ably.com/ably-auth/token/docs',
        closeOnUnload: true, // See https://faqs.ably.com/why-dont-presence-members-leave-as-soon-as-i-close-a-tab
      })),
      (channel = ably.channels.get(channelName));

    ably.connection.on(function (stateChange) {
      log('[Ably: ' + stateChange.current + ' ]');
    });

    ably.connection.on('connected', function () {
      $connectBtn.text('Connected to Ably');
      $connectBtn.prop('disabled', true);
      $name.prop('disabled', true);
    });

    channel.attach(function (err) {
      if (err) {
        log('[Error attaching to channel: ' + err.toString() + ']');
      } else {
        log('[Attached to channel ' + channelName + ']');
        $('#presence-controls').slideDown();
        channel.presence.subscribe(function (msg) {
          log('[Received presence ' + msg.action + ' from ' + msg.clientId + ', avatar: ' + msg.data + ']');
          channel.presence.get(function (err, presenceSet) {
            $('#presence-set').html(
              $.map(presenceSet, function (item) {
                return '<li><span class="emoji">' + (item.data || '') + '</span> ' + item.clientId + '</li>';
              }).join(),
            );
          });
        });
      }
    });

    function enterPresence() {
      var avatar = $('input[name=avatar]:checked').val();
      log('[Entering...] ');
      channel.presence.enter(avatar, function (err) {
        if (err) {
          log('[Error entering presence: ' + err.toString() + ']');
        } else {
          log('[Successfully entered the presence set]');
          inPresenceSet = true;
          $togglePresence.text('Leave Presence');
          $('#avatar-tip').slideDown();
        }
      });
    }

    function leavePresence() {
      log('[Leaving...] ');
      channel.presence.leave(function (err) {
        if (err) {
          log('[Error leaving presence: ' + err.toString() + ']');
        } else {
          log('[Successfully left the presence set]');
          $togglePresence.text('Enter Presence');
          inPresenceSet = false;
        }
      });
    }

    $togglePresence.on('click', function () {
      inPresenceSet ? leavePresence() : enterPresence();
    });

    $('input[type=radio][name=avatar]').change(function () {
      if (!inPresenceSet) {
        return;
      }
      var avatar = $('input[name=avatar]:checked').val();

      log('[Updating avatar...] ');
      channel.presence.update(avatar, function (err) {
        if (err) {
          log('[Error updating avatar: ' + err.toString() + ']');
        } else {
          log('[Successfully updated avatar]');
        }
      });
    });
  });

  /* Set up the link to open a new window with this random channel name */
  var urlWithChannel = document.location.href.replace(/#.*$/, '');
  if (urlWithChannel.indexOf('channel=') < 0) {
    urlWithChannel += (urlWithChannel.indexOf('?') < 0 ? '?' : '&') + 'channel=' + escape(channelName);
  }
  $('a#new-browser').attr('href', urlWithChannel + '#live-demo');

  function log(msg) {
    var timePassed = Math.round((new Date().getTime() - started) / 100) / 10;
    $output.text(timePassed + 's - ' + msg + '\n' + $output.text());
  }
});
