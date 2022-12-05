// for: content/api-streamer/examples.textile
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
window.addEventListener('load', function () {
  var ably = new Ably.Realtime({ authUrl: 'https://ably.com/ably-auth/token/dsx' }),
    $resultTfl = $('#result-tfl'),
    $resultCoindesk = $('#result-coindesk'),
    $flashBox = $('.c-flashbox'),
    $tableTfl = $('#table-tfl'),
    tableBodyTfl = document.getElementById('table-tfl').getElementsByTagName('tbody')[0],
    tableTflData = {},
    tableTfl = {},
    oldPriceCoindesk = 0.0,
    oldPriceBitflyer = 0.0,
    channelTfl,
    channelCoindesk,
    $resultWeather = $('#result-open-weather'),
    oldTemperature = -50,
    channelWeather,
    $resultBitflyer = $('#result-bitflyer'),
    channelBitflyer,
    channelHackerNews,
    $resultHackerNews = $('#result-hackernews-title'),
    $resultHackerNewsLink = $('#result-hackernews-link'),
    $resultBBCnews = $('#result-bbc-news'),
    $resultBBCdesc = $('#result-bbc-desc'),
    channelBBCnews;

  ably.connection.on('connecting', function () {
    console.log('[Connecting to Ably]');
  });

  ably.connection.on('connected', function () {
    console.log('[Connected to Ably]');
  });

  function subscribeToChannel(name, channel, subscribe) {
    if (channel) {
      channel.detach(function (err) {
        if (err) {
          console.log('Error detaching: ' + err);
        } else {
          subscribe(name);
        }
      });
    } else {
      subscribe(name);
    }
  }

  //==============tfl-start
  function subscribeTfl(name) {
    let newBodyTfl = document.createElement('tbody');
    tableBodyTfl.parentNode.replaceChild(newBodyTfl, tableBodyTfl);
    tableBodyTfl = newBodyTfl;
    channelTfl = ably.channels.get('[product:ably-tfl/tube]tube:' + name + ':arrivals');
    historyTfl();
    channelTfl.subscribe(function (msg) {
      updateTfl(msg.data);
    });
  }

  function updateTfl(arrivals) {
    arrivals = arrivals.reverse();
    let newBodyTfl = document.createElement('tbody');
    arrivals.forEach((arrival) => {
      let arrivalTime = new Date(arrival.ExpectedArrival).toLocaleTimeString();
      let tmpTableRow = newBodyTfl.insertRow(0);
      tmpTableRow.insertCell(0).innerHTML = arrivalTime;
      tmpTableRow.insertCell(1).innerHTML = arrival.Towards;
      tmpTableRow.insertCell(2).innerHTML = arrival.PlatformName;
      tmpTableRow.insertCell(3).innerHTML = arrival.LineName;
    });
    for (let i = 0; i < arrivals.length; i++) {
      let arrivalTime = new Date(arrivals[arrivals.length - i - 1].ExpectedArrival).toLocaleTimeString();
      if (tableBodyTfl.rows[i] != undefined && newBodyTfl.rows[i] != undefined) {
        if (tableBodyTfl.rows[i].cells[0].innerHTML != arrivalTime) {
          newBodyTfl.rows[i].classList.add('c-flashbox__positive-flash');
        }
      }
    }

    tableBodyTfl.parentNode.replaceChild(newBodyTfl, tableBodyTfl);
    tableBodyTfl = newBodyTfl;
  }
  function historyTfl() {
    channelTfl.attach(function () {
      channelTfl.history({ untilAttach: true, limit: 1 }, function (err, resultPage) {
        if (err) {
          console.log(err);
          return;
        }
        let recentMessage = resultPage.items[0];
        if (recentMessage) {
          updateTfl(recentMessage.data);
        }
      });
    });
  }
  $('select#naptan-code').on('change', function () {
    subscribeToChannel($('select#naptan-code').val(), channelTfl, subscribeTfl);
  });

  subscribeToChannel($('select#naptan-code').val(), channelTfl, subscribeTfl);
  //==============tfl-end

  //==============coindesk-bitcoin-start
  function subscribeCoindesk(name) {
    channelCoindesk = ably.channels.get('[product:ably-coindesk/bitcoin]bitcoin:' + name);
    historyCoindesk();
    channelCoindesk.subscribe(function (msg) {
      let newPrice = parseFloat(msg.data.replace(',', ''));
      if (oldPriceCoindesk > newPrice) {
        $resultCoindesk.removeClass('c-flashbox__negative-flash');
        $resultCoindesk.removeClass('c-flashbox__positive-flash');
        setTimeout(function () {
          $resultCoindesk.addClass('c-flashbox__negative-flash');
        }, 6);
      } else if (oldPriceCoindesk < newPrice) {
        $resultCoindesk.removeClass('c-flashbox__negative-flash');
        $resultCoindesk.removeClass('c-flashbox__positive-flash');
        setTimeout(function () {
          $resultCoindesk.addClass('c-flashbox__positive-flash');
        }, 6);
      }
      oldPriceCoindesk = newPrice;
      $resultCoindesk.text('$' + msg.data);
    });
  }

  function historyCoindesk() {
    channelCoindesk.attach(function () {
      channelCoindesk.history({ untilAttach: true, limit: 1 }, function (err, resultPage) {
        if (err) {
          console.log(err);
          return;
        }
        let recentMessage = resultPage.items[0];
        if (recentMessage) {
          $resultCoindesk.text('$' + recentMessage.data);
        }
      });
    });
  }
  subscribeToChannel('usd', channelCoindesk, subscribeCoindesk);
  //==============coindesk-bitcoin-end

  //==============openweather-start
  function subscribeOpenWeather(id) {
    //OpenWeatherMap/Weather
    channelWeather = ably.channels.get('[product:ably-openweathermap/weather]weather:' + id);
    let newTemperature, weatherDesc;
    historyOpenWeather();
    //subscribing to updates in the weather data
    channelWeather.subscribe((msg) => {
      if ($('select#city-id').val() == msg.data.id) {
        if (oldTemperature > newTemperature) {
          $resultWeather.removeClass('c-flashbox__negative-flash');
          $resultWeather.removeClass('c-flashbox__neutral-flash');
          $resultWeather.removeClass('c-flashbox__positive-flash');
          setTimeout(function () {
            $resultWeather.addClass('c-flashbox__negative-flash');
          }, 6);
        } else if (oldTemperature < newTemperature) {
          $resultWeather.removeClass('c-flashbox__negative-flash');
          $resultWeather.removeClass('c-flashbox__positive-flash');
          setTimeout(function () {
            $resultWeather.addClass('c-flashbox__positive-flash');
          }, 6);
        } else if (weatherDesc == msg.data.weather[0].description) {
          $resultWeather.removeClass('c-flashbox__negative-flash');
          $resultWeather.removeClass('c-flashbox__neutral-flash');
          $resultWeather.removeClass('c-flashbox__positive-flash');
          setTimeout(function () {
            $resultWeather.addClass('c-flashbox__neutral-flash');
          }, 6);
        }
        oldTemperature = newTemperature;
        weatherDesc = msg.data.weather[0].description;
        $resultWeather.text((msg.data.main.temp - 273.15).toFixed(2) + '°C with ' + msg.data.weather[0].description);
      }
    });
  }

  function historyOpenWeather() {
    channelWeather.attach(function () {
      channelWeather.history({ untilAttach: true, limit: 1 }, function (err, resultPage) {
        if (err) {
          console.log(err);
          return;
        }
        let recentMessage = resultPage.items[0];
        if (recentMessage) {
          $resultWeather.text(
            (recentMessage.data.main.temp - 273.15).toFixed(2) + '°C with ' + recentMessage.data.weather[0].description,
          );
        }
      });
    });
  }
  $('select#city-id').on('change', function () {
    subscribeToChannel($('select#city-id').val(), channelWeather, subscribeOpenWeather);
  });
  subscribeToChannel($('select#city-id').val(), channelWeather, subscribeOpenWeather);
  //==============openweather-end

  //==============bitflyer-bitcoin-start
  function subscribeBitflyer(name) {
    channelBitflyer = ably.channels.get('[product:ably-bitflyer/bitcoin]bitcoin:' + name);
    historyBitflyer();
    channelBitflyer.subscribe(function (msg) {
      let newPrice = parseFloat(msg.data.price);
      if (oldPriceBitflyer > newPrice) {
        $resultBitflyer.removeClass('c-flashbox__negative-flash');
        $resultBitflyer.removeClass('c-flashbox__positive-flash');
        setTimeout(function () {
          $resultBitflyer.addClass('c-flashbox__negative-flash');
        }, 6);
      } else if (oldPriceBitflyer < newPrice) {
        $resultBitflyer.removeClass('c-flashbox__negative-flash');
        $resultBitflyer.removeClass('c-flashbox__positive-flash');
        setTimeout(function () {
          $resultBitflyer.addClass('c-flashbox__positive-flash');
        }, 6);
      }
      oldPriceBitflyer = newPrice;
      $resultBitflyer.text('¥' + msg.data.price);
    });
  }

  function historyBitflyer() {
    channelBitflyer.attach(function () {
      channelBitflyer.history({ untilAttach: true, limit: 1 }, function (err, resultPage) {
        if (err) {
          console.log(err);
          return;
        }
        let recentMessage = resultPage.items[0];
        if (recentMessage) {
          $resultBitflyer.text('¥' + recentMessage.data.price);
        }
      });
    });
  }
  subscribeToChannel('jpy', channelBitflyer, subscribeBitflyer);
  //==============bitflyer-bitcoin-end

  //==============bbc-news-start
  function subscribeBBCnews(name) {
    channelBBCnews = ably.channels.get('[product:ably-bbc/news]category:' + name);
    historyBBCnews();
    channelBBCnews.subscribe(function (msg) {
      $resultBBCnews.removeClass('c-flashbox__negative-flash');
      $resultBBCnews.removeClass('c-flashbox__positive-flash');
      $resultBBCnews.removeClass('c-flashbox__neutral-flash');
      $resultBBCdesc.removeClass('c-flashbox__negative-flash');
      $resultBBCdesc.removeClass('c-flashbox__positive-flash');
      $resultBBCdesc.removeClass('c-flashbox__neutral-flash');
      setTimeout(function () {
        $resultBBCnews.addClass('c-flashbox__neutral-flash');
        $resultBBCdesc.addClass('c-flashbox__neutral-flash');
      }, 6);
      $resultBBCnews.text(msg.data.title);
      $resultBBCdesc.text(msg.data.description);
    });
  }

  function historyBBCnews() {
    channelBBCnews.attach(function () {
      channelBBCnews.history({ untilAttach: true, limit: 1 }, function (err, resultPage) {
        if (err) {
          console.log(err);
          return;
        }
        let recentMessage = resultPage.items[0];
        if (recentMessage) {
          $resultBBCnews.text(recentMessage.data.title);
          $resultBBCdesc.text(recentMessage.data.description);
        }
      });
    });
  }
  subscribeToChannel('home', channelBBCnews, subscribeBBCnews);
  //==============bbc-news-end

  //==============hackernews-start
  function subscribeHackerNews(name) {
    channelHackerNews = ably.channels.get('[product:ably-hackernews/posts]posts:' + name);
    historyHackerNews();
    channelHackerNews.subscribe(function (msg) {
      $resultHackerNews.removeClass('c-flashbox__negative-flash');
      $resultHackerNews.removeClass('c-flashbox__positive-flash');
      $resultHackerNews.removeClass('c-flashbox__neutral-flash');
      $resultHackerNewsLink.removeClass('c-flashbox__negative-flash');
      $resultHackerNewsLink.removeClass('c-flashbox__positive-flash');
      $resultHackerNewsLink.removeClass('c-flashbox__neutral-flash');
      setTimeout(function () {
        $resultHackerNews.addClass('c-flashbox__neutral-flash');
        $resultHackerNewsLink.addClass('c-flashbox__neutral-flash');
      }, 6);
      $resultHackerNews.text(msg.data.title);
      $resultHackerNewsLink.text(msg.data.link);
    });
  }

  function historyHackerNews() {
    channelHackerNews.attach(function () {
      channelHackerNews.history({ untilAttach: true, limit: 1 }, function (err, resultPage) {
        if (err) {
          console.log(err);
          return;
        }
        let recentMessage = resultPage.items[0];
        if (recentMessage) {
          $resultHackerNews.text(recentMessage.data.title);
          $resultHackerNewsLink.text(recentMessage.data.link);
        }
      });
    });
  }
  subscribeToChannel('new', channelHackerNews, subscribeHackerNews);
  //==============hackernews-end
});
