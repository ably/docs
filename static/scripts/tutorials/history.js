/* eslint-disable no-undef */
window.addEventListener('load', function () {
  var ably = new Ably.Realtime({ authUrl: 'https://ably.com/ably-auth/token/docs', echoMessages: false }),
    channelName = getQueryParam('channel') || 'persisted:' + getRandomChannelName(),
    channel = ably.channels.get(channelName),
    $result = $('#result'),
    MaxReplayDelay = 2000,
    MaxReplayDuration = 2000;

  ably.connection.on('connecting', function () {
    log('[Connecting to Ably...]');
  });

  ably.connection.on('connected', function () {
    log('[Connected to Ably] Ready to publish...');
  });

  channel.attach(function () {
    log('[Piano channel] Attached to channel ' + channelName + ', ready to record...');
  });

  channel.subscribe(function (msg) {
    var key = msg.data.key;
    press(key, '#FF0000');
    setTimeout(function () {
      depressed[key] = false;
      fade(key)();
    }, msg.data.duration);
  });

  function recordKeyDepressed(key) {
    var payload = {
      key: key,
      pressed: depressed[key],
      duration: new Date().getTime() - depressed[key],
    };
    channel.publish('play', payload, function (err) {
      if (err) {
        return log('[Publish FAILED] ' + JSON.stringify(err));
      }
      log('[Published] ' + JSON.stringify(payload));
    });
    depressed[key] = false;
  }

  $('button#replay-button').on('click', function () {
    var lastKeyTimestamp,
      song = [],
      delay = 0;
    log('[Loading history...]');

    channel.history({ limit: 10 }, function (err, resultPage) {
      if (err) {
        return log('[History FAILED] ' + JSON.stringify(err));
      }

      resultPage.items.forEach(function (msg) {
        if (!lastKeyTimestamp) {
          lastKeyTimestamp = msg.data.pressed;
        }
        song.unshift({ key: msg.data.key, pressed: lastKeyTimestamp - msg.data.pressed, duration: msg.data.duration });
      });

      if (song.length) {
        lastKeyTimestamp = song[0].pressed;
        song.forEach(function (note) {
          delay += Math.min(MaxReplayDelay, lastKeyTimestamp - note.pressed);
          setTimeout(function () {
            press(note.key);
          }, delay);
          setTimeout(function () {
            depressed[note.key] = false;
            fade(note.key)();
          }, delay + Math.min(MaxReplayDuration, note.duration) + 10);
          lastKeyTimestamp = note.pressed;
        });
        log(
          '[History] Replaying ' +
            song
              .map(function (note) {
                return note.key;
              })
              .join(' > '),
        );
      } else {
        log('[No song to play as nothing in history] Play something first and try again');
      }
    });
  });

  var started = new Date().getTime();
  function log(msg) {
    var timePassed = Math.round((new Date().getTime() - started) / 100) / 10;
    $result.text(timePassed + 's - ' + msg + '\n' + $result.text());
  }

  /* Set up the link to open a new window with this random channel name */
  var urlWithChannel = document.location.href.replace(/#.*$/, '');
  if (urlWithChannel.indexOf('channel=') < 0) {
    urlWithChannel += (urlWithChannel.indexOf('?') < 0 ? '?' : '&') + 'channel=' + escape(channelName);
  }
  $('a#new-browser').attr('href', urlWithChannel + '#live-demo');

  /* Piano thanks to https://github.com/michaelmp/js-piano */
  /* Piano keyboard pitches. Names match sound files by ID attribute. */

  var keys = [
    'A2',
    'Bb2',
    'B2',
    'C3',
    'Db3',
    'D3',
    'Eb3',
    'E3',
    'F3',
    'Gb3',
    'G3',
    'Ab3',
    'A3',
    'Bb3',
    'B3',
    'C4',
    'Db4',
    'D4',
    'Eb4',
    'E4',
    'F4',
    'Gb4',
    'G4',
    'Ab4',
    'A4',
    'Bb4',
    'B4',
    'C5',
  ];

  /* Corresponding keyboard keycodes, in order w/ 'keys'. */
  /* QWERTY layout:
  /*   upper register: Q -> P, with 1-0 as black keys. */
  /*   lower register: Z -> M, , with A-L as black keys. */

  var codes = [
    90, 83, 88, 67, 70, 86, 71, 66, 78, 74, 77, 75, 81, 50, 87, 69, 52, 82, 53, 84, 89, 55, 85, 56, 73, 57, 79, 80,
  ];

  var pedal = 32; /* Keycode for sustain pedal. */
  var tonic = 'A2'; /* Lowest pitch. */

  /* Piano state. */

  var intervals = {};
  var depressed = {};

  /* Selectors */

  function pianoClass(name) {
    return '.piano-' + name;
  }

  function soundId(id) {
    return 'sound-' + id;
  }

  function sound(id) {
    var it = document.getElementById(soundId(id));
    return it;
  }

  /* Virtual piano keyboard events. */

  function keyup(code) {
    var offset = codes.indexOf(code);
    var k;
    if (offset >= 0) {
      k = keys.indexOf(tonic) + offset;
      return keys[k];
    }
  }

  function keydown(code) {
    return keyup(code);
  }

  function press(key, color) {
    var audio = sound(key);
    if (depressed[key]) {
      return;
    }
    clearInterval(intervals[key]);
    if (audio) {
      audio.pause();
      audio.volume = 1.0;
      if (audio.readyState >= 2) {
        audio.currentTime = 0;
        audio.play();
        depressed[key] = new Date().getTime();
      }
    }
    $(pianoClass(key)).css({
      backgroundColor: color || '#88FFAA',
    });
  }

  /* Manually diminish the volume when the key is not sustained. */
  /* These values are hand-selected for a pleasant fade-out quality. */

  function fade(key) {
    var audio = sound(key);
    var stepfade = function () {
      if (audio) {
        if (audio.volume < 0.03) {
          kill(key)();
        } else {
          if (audio.volume > 0.2) {
            audio.volume = audio.volume * 0.95;
          } else {
            audio.volume = audio.volume - 0.01;
          }
        }
      }
    };
    return function () {
      clearInterval(intervals[key]);
      intervals[key] = setInterval(stepfade, 5);
    };
  }

  /* Bring a key to an immediate halt. */

  function kill(key) {
    var audio = sound(key);
    return function () {
      clearInterval(intervals[key]);
      if (audio) {
        audio.pause();
      }
      if (key.length > 2) {
        $(pianoClass(key)).css({
          backgroundColor: 'black',
        });
      } else {
        $(pianoClass(key)).css({
          backgroundColor: 'white',
        });
      }
    };
  }

  /* Simulate a gentle release, as opposed to hard stop. */

  var fadeout = true;

  /* Sustain pedal, toggled by user. */

  var sustaining = false;

  /* Register mouse event callbacks. */

  keys.forEach(function (key) {
    $(pianoClass(key)).mousedown(function () {
      $(pianoClass(key)).css({
        backgroundColor: '#88FFAA',
      });
      press(key);
    });
    if (fadeout) {
      $(pianoClass(key)).mouseup(function () {
        recordKeyDepressed(key);
        if (!sustaining) {
          fade(key)();
        }
      });
    } else {
      $(pianoClass(key)).mouseup(function () {
        recordKeyDepressed(key);
        if (!sustaining) {
          kill(key)();
        }
      });
    }
  });

  /* Register keyboard event callbacks. */

  $(document).keydown(function (event) {
    if (event.which === pedal) {
      sustaining = true;
      $(pianoClass('pedal')).addClass('piano-sustain');
    }
    press(keydown(event.which));
  });

  $(document).keyup(function (event) {
    if (event.which === pedal) {
      event.preventDefault();
      event.stopImmediatePropagation();
      sustaining = false;
      $(pianoClass('pedal')).removeClass('piano-sustain');
      Object.keys(depressed).forEach(function (key) {
        if (!depressed[key]) {
          if (fadeout) {
            fade(key)();
          } else {
            kill(key)();
          }
        }
      });
    }
    if (keyup(event.which)) {
      recordKeyDepressed(keyup(event.which));
      if (!sustaining) {
        if (fadeout) {
          fade(keyup(event.which))();
        } else {
          kill(keyup(event.which))();
        }
      }
    }
  });
});
