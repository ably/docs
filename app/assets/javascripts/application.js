$(function() {
  var jumpToNav = $('select#jump-to-nav'),
      stickNavHeight = 80,
      navIsScrolling = false,
      inlineTOCs = $('.inline-toc ul')

  function findAnchorTag(anchorId) {
    var tags = 'a,p,h1,h2,h3,h4,h5,h6',
        matchers = [];
    $.each(tags.split(','), function(index, tag) {
      matchers.push(tag + "[id='" + anchorId + "']");
    });
    return $(matchers.join(','));
  }

  function stripNamespace(text) {
    /* break on ::, ., or \ namespace separators */
    var parts = text.split(/::|\\|\./),
        splitter = text.match(/::|\\|\./g),
        lastPart = parts[parts.length-1];

    if (splitter && (lastPart.match(/^[A-Z0-9]+$/) || (lastPart.length <= 6))) {
      /* If the last part of the definition is a Ruby constant
         i.e. PresenceMessage::ACTION
         then show the class to add context.
         Equally, if the last part is very short
         i.e. PresenceMessage.Action
         then it to needs context */
      return parts[parts.length-2] + splitter[splitter.length-1] + lastPart;
    } else {
      return lastPart;
    }
  }

  // On selecting a nav section, scroll it into view
  var jumpToCallback = function(aid) {
    var idTag = findAnchorTag(aid);
    navIsScrolling = true;
    if (!idTag.length) {
      if (console.error) { console.error('Hash tag target #' + aid + ' is missing.  Could not scroll'); }
    } else {
      $('body').animate({ scrollTop: idTag.offset().top - stickNavHeight }, 'fast', function() {
        setTimeout(function() { navIsScrolling = false; }, 750);
      });
      var newUrl = document.location.href.replace(/#[^#]*$/,'') + '#' + aid;
      if (window.history.pushState) {
        window.history.pushState($('article:first').html(), document.title + ' : ' + aid, newUrl);
      } else {
        document.location.href = newUrl;
      }
    }
  };

  var syncNavsWithLanguageSpecificContent = function() {
    var matchers = [
      { nodes: jumpToNav.find('option[id]'), attribute: 'id' },
      { nodes: inlineTOCs.find('a[href^="#"]'), attribute: 'href' }
    ];

    $.each(matchers, function(item, matcher) {
      matcher.nodes.each(function() {
        var anchorId = $(this).attr(matcher.attribute).replace(/^(#|anchor-)/,''),
            anchorTag = findAnchorTag(anchorId),
            languageContentWithinTag = anchorTag.find('span[lang].lang-resource.selected');

        // If there is no matching anchor tag, hide this navigation item
        if (anchorTag.is(':visible')) {
          if (anchorTag.find('ul.lang-selector').length > 0) {
            // Anchor contains language specific content, make sure the content is visible
            if (anchorTag.find(':visible').length > 0) {
              $(this).show();
            } else {
              $(this).hide();
            }
          } else {
            // Anchor tag does not contain language specific content
            $(this).show();
          }
        } else {
          $(this).hide();
        }

        if (languageContentWithinTag.length) {
          $(this).text(stripNamespace(languageContentWithinTag.text()));
        }
      });
    });
  };

  jumpToNav.on('change', function(evt) {
    var selected = $(this).find('option:selected'),
        aid = selected.attr('id').replace(/^anchor-/,'');
    if (aid) jumpToCallback(aid);
  });

  $(document).on('language-change', syncNavsWithLanguageSpecificContent);
  syncNavsWithLanguageSpecificContent();

  // if a user clicks on an anchor link, scroll nicely and position correctly
  $('a[href]').on('click', function(evt) {
    var href = $(this).attr('href');
    if (href.match(/^#.+/)) {
      jumpToCallback.call(this, href.replace(/^#/, ''));
      evt.preventDefault();
    }
  });

  // Once a user scrolls, just select the "jump to" nav option again
  // The main Ably website is smarter and keeps track of where the user is on the page
  var jumpToOption = $('select#jump-to-nav option:first')[0],
      sinceLastScroll = new Date().getTime();
  $(window).on('scroll', function() {
    if (!navIsScrolling && (new Date().getTime() - sinceLastScroll > 250)) {
      sinceLastScroll = new Date().getTime();
      if (jumpToNav.find('option:selected')[0] != jumpToOption) {
        $(jumpToOption).attr('selected', true);
      }
    }
  });

  // Enable the code editor for JSBin
  $('pre.code-editor.open-jsbin').each(function() {
    var addTryItButton = function() {
      if ($(this).hasClass('prettyprint')) {
        var binId = $(this).attr('class').match(/open-jsbin-(\w+)/i)[1],
            btn = $('<a href="//jsbin.ably.io/' + binId + '/1/edit?javascript,live" target="_blank" class="try-it-button">Try it</a>');
        $(this).append(btn);
      } else {
        setTimeout(addTryItButton, 500);
      }
    }.bind(this);
    addTryItButton();
  });

  /* Replace Handlebar variables with values such as API keys & tokens for demos */
  var preLangBlocks = $('pre[lang],code'),
      msSinceEpoch = new Date().getTime(),
      msSinceEpochBlocks,
      sSinceEpochBlocks;

  $.get('https://www.ably.io/ably-auth/api-key/docs', function(apiKey, status) {
    if (status === 'success') {
      var keyName = apiKey.match(/([^\.]+\.[^:]+):.+/)[1],
          keySecret = apiKey.match(/[^\.]+\.[^:]+:(.+)/)[1];

      if (typeof(window.onApiKeyRetrieved) === 'function') {
        window.onApiKeyRetrieved(apiKey);
      }

      var tokenValidity = 12 * 60 * 60 * 1000; // 12 hours

      new Ably.Rest({ key: apiKey }).auth.createTokenRequest({ "ttl": tokenValidity, "capability": JSON.stringify({ "*":["*"] }) }, null,
        function(err, token) {
          preLangBlocks.each(function() {
            this.innerHTML = this.innerHTML.
              replace(/{{API_KEY_NAME}}/g, keyName).
              replace(/{{API_KEY}}/g, apiKey).
              replace(/{{API_KEY_BASE64}}/g, Base64.encode(apiKey)).
              replace(/{{APP_ID}}/g, keyName.split('.')[0]).
              replace(/{{SIGNED_TOKEN_REQUEST_EXAMPLE}}/g, JSON.stringify(token, null, "  "));
          }
        );
      });
    }
  });

  $.get('https://www.ably.io/ably-auth/token/docs', function(token, status) {
    if (status === 'success') {
      preLangBlocks.each(function() {
        this.innerHTML = this.innerHTML.
          replace(/{{TOKEN}}/g, token).
          replace(/{{TOKEN_BASE64}}/g, Base64.encode(token));
      });
    }
  });

  var nouns = 'people history way art world information map two family government health system computer meat year thanks music person reading method data food understanding theory law bird literature problem software control knowledge power ability economics love internet television science library nature fact product idea temperature investment area society activity story industry media thing oven community definition safety quality development language management player variety video week security country exam movie organization equipment physics analysis policy series thought basis boyfriend direction strategy technology army camera freedom paper environment child instance month truth marketing university writing article department difference goal news audience fishing growth income marriage user combination failure meaning medicine philosophy teacher communication night chemistry disease disk energy nation road role soup advertising location success addition apartment education math moment painting politics attention decision event property shopping student wood competition distribution entertainment office population president unit category cigarette context introduction opportunity performance driver flight length magazine newspaper relationship teaching cell dealer finding lake member message phone scene appearance association concept customer death discussion housing inflation insurance mood woman advice blood effort expression importance opinion payment reality responsibility situation skill statement wealth application city county depth estate foundation people history way art world information map two family government health system computer meat year thanks music person reading method data food understanding theory law bird literature problem software control knowledge power ability economics love internet television science library nature fact product idea temperature investment area society activity story industry media thing oven community definition safety quality development language management player variety video week security country exam movie organization equipment physics analysis policy series thought basis boyfriend direction strategy technology army camera freedom paper environment child instance month truth marketing university writing article department difference goal news audience fishing growth income marriage user combination failure meaning medicine philosophy teacher communication night chemistry disease disk energy nation road role soup advertising location success addition apartment education math moment painting politics attention decision event property shopping student wood competition distribution entertainment office population president unit category cigarette context introduction opportunity performance driver flight length magazine newspaper relationship teaching cell dealer finding lake member message phone scene appearance association concept customer death discussion housing inflation insurance mood woman advice blood effort expression importance opinion payment reality responsibility situation skill statement wealth application city county depth estate foundation grandmother heart perspective photo recipe studio topic collection depression imagination passion percentage resource setting ad agency college connection criticism debt description memory patience secretary solution administration aspect attitude director personality psychology recommendation response selection storage version alcohol argument complaint contract emphasis highway loss membership possession preparation steak union agreement cancer currency employment engineering entry interaction mixture preference region republic tradition virus actor classroom delivery device difficulty drama election engine football guidance hotel owner priority protection suggestion tension variation anxiety atmosphere awareness bath bread candidate climate comparison confusion construction elevator emotion employee employer guest height leadership mall manager operation recording sample transportation charity cousin disaster editor efficiency excitement extent feedback guitar homework leader mom outcome permission presentation promotion reflection refrigerator resolution revenue session singer tennis basket bonus cabinet childhood'.split(' '),
      randomNoun = nouns[Math.floor(Math.random() * nouns.length)],
      msSinceEpochBlocks,
      sSinceEpochBlocks;

  window.randomChannelName = randomNoun;

  preLangBlocks.each(function() {
    this.innerHTML = this.innerHTML.
      replace(/{{MS_SINCE_EPOCH}}/g, '<span class="ms-since-epoch">' + msSinceEpoch + '</span>').
      replace(/{{SECONDS_SINCE_EPOCH}}/g, '<span class="s-since-epoch">' + Math.round(msSinceEpoch / 1000) + '</span>').
      replace(/{{RANDOM_CHANNEL_NAME}}/g, randomNoun);
  }).promise().done(function() {
    window.setTimeout(function() {
      msSinceEpochBlocks = $('span.ms-since-epoch');
      sSinceEpochBlocks = $('span.s-since-epoch');

      window.setInterval(function() {
        msSinceEpoch = new Date().getTime();
        setTimeInBlocks(msSinceEpochBlocks, msSinceEpoch);
        setTimeInBlocks(sSinceEpochBlocks, Math.round(msSinceEpoch / 1000));
      }, 50);
    }, 2000); // wait for code formatter to update time blocks
  });

  function setTimeInBlocks(blocks, newValue) {
    blocks.each(function() {
      this.innerHTML = this.innerHTML.replace(/\d{6,}/, newValue);
    });
  }

  // Account for sticky header that overlaps the anchored link
  var adjustAnchor = function() {
    var $anchor = $(':target');

    if ($anchor.length > 0) {
      $('html, body')
        .stop()
        .animate({
            scrollTop: $anchor.offset().top - stickNavHeight
        }, 100);
    }
  };

  $(window).on('hashchange load', function() {
    adjustAnchor();
  });
});

/*
  Global helper methods for tutorials
  These methods will be replaced with string values when published to Ably
*/

function getQueryParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getRandomChannelName() {
  return window.randomChannelName;
}
