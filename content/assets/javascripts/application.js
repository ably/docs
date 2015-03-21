$(function() {
  var jumpToNav = $('select#jump-to-nav'),
      navIsScrolling = false,
      inlineTOCs = $('.inline-toc ul')

  function findAnchorTag(anchorId) {
    var tags = 'a,h1,h2,h3,h4,h5,h6',
        matchers = [];
    $.each(tags.split(','), function(index, tag) {
      matchers.push(tag + "[id='" + anchorId + "']");
    });
    return $(matchers.join(','));
  }

  // On selecting a nav section, scroll it into view
  var jumpToCallback = function(aid) {
    var idTag = findAnchorTag(aid);
    navIsScrolling = true;
    if (!idTag.length) {
      if (console.error) { console.error('Hash tag target #' + aid + ' is missing.  Could not scroll'); }
    } else {
      $('body').animate({ scrollTop: idTag.offset().top - 50 }, 'fast', function() {
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

        if (languageContentWithinTag.length) {
          $(this).text(languageContentWithinTag.text());
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

  $.get('https://ably.io/ably-auth/api-key/docs', function(apiKey, status) {
    if (status === 'success') {
      if (typeof(window.onApiKeyRetrieved) === 'function') {
        window.onApiKeyRetrieved(apiKey);
      }

      $('pre[lang]').each(function() {
        this.innerHTML = this.innerHTML.
          replace(/{{API_KEY_ID}}/g, apiKey.match(/([^\.]+\.[^:]+):.*/)[1]).
          replace(/{{API_KEY}}/g, apiKey).
          replace(/{{API_KEY_BASE64}}/g, Base64.encode(apiKey));
      });
    }
  });

  $.get('https://ably.io/ably-auth/token/docs', function(token, status) {
    if (status === 'success') {
      $('pre[lang]').each(function() {
        this.innerHTML = this.innerHTML.
          replace(/{{TOKEN}}/g, token).
          replace(/{{TOKEN_BASE_64}}/g, Base64.encode(token));
      });
    }
  });

  var preLangBlocks = $('pre[lang]'),
      msSinceEpoch = new Date().getTime();

  preLangBlocks.each(function() {
    this.innerHTML = this.innerHTML.
      replace(/{{MS_SINCE_EPOCH}}/g, msSinceEpoch).
      replace(/{{SECONDS_SINCE_EPOCH}}/g, Math.round(msSinceEpoch / 1000));
  });

  window.setInterval(function() {
    var oldEpoch = msSinceEpoch;
    msSinceEpoch = new Date().getTime();

    preLangBlocks.each(function() {
      this.innerHTML = this.innerHTML.
        replace(new RegExp(String(oldEpoch), "g"), msSinceEpoch).
        replace(new RegExp(String(Math.round(oldEpoch / 1000)), "g"), Math.round(msSinceEpoch / 1000));
    });
  }, 1000);
});
