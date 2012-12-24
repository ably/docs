$(function() {
  $('pre:has(code)')
    .each(function() {
      var $first = $(this),
          $siblings = $first.nextUntil(':not(pre)');
      $first.addClass('prettyprint');

      if (!$first.hasClass('with-lang-nav')) {
        if ($siblings.length) {
          var langs = [$first.attr('lang')],
              langSelector = $('<ul class="lang-selector"></ul>');

          // we will be building a nav so change the class so it's aware and this code block is selected
          $first.addClass('with-lang-nav').addClass('selected');

          // find all siblings and add to the language nav, and set up with correct class
          $siblings.each(function() { langs.push($(this).attr('lang')); }).addClass('with-lang-nav');
          $.each(langs, function(i, n) {
            langSelector.append('<li>' + n + '</li>');
          });
          langSelector.find('li:first').addClass('selected');

          // insert nav before this first code block
          $first.before(langSelector);

          langSelector.on('click', 'li', function() {
            var selectedLang = $(this).text();
            langSelector.find('li').removeClass('selected');
            $(this).addClass('selected');
            $siblings.removeClass('selected');
            if ($first.attr('lang') == selectedLang) {
              $first.addClass('selected');
            } else {
              $first.removeClass('selected');
              $siblings.each(function() { if ($(this).attr('lang') == selectedLang) $(this).addClass('selected'); });
            }
          });
        }
      }
    });
  prettyPrint();
});