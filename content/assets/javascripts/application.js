$(function() {
  var jumpToNav = $('select#jump-to-nav'),
      navIsScrolling = false;

  // On selecting a nav section, scroll it into view
  var jumpToCallback = function(aid) {
    var idTag = $("a[name='"+ aid +"'],h1[id='"+ aid +"'],h2[id='"+ aid +"'],h3[id='"+ aid +"'],h4[id='"+ aid +"'],h6[id='"+ aid +"']");
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

  jumpToNav.on('change', function(evt) {
    var selected = $(this).find('option:selected'),
        aid = selected.attr('id').replace(/^anchor-/,'');
    if (aid) jumpToCallback(aid);
  });

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
});