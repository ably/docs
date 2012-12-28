$(function() {
  $('pre:has(code),p[lang],span[lang],div[lang]').each(function() {
    var $first = $(this),
        tag = this.nodeName.toLowerCase(),
        $siblings = $first.nextUntil(':not(' + tag + '),:not([lang])'),
        dlParent = $first.parents('dl').length;

    // convert all pre formatted text except those within a definition list without a language to pretty code blocks
    // pre tags within dls without language are used for alternate paths
    if ( (tag == 'pre') && (!dlParent || (dlParent && $first.attr('lang'))) ) {
      if ($first.attr('lang')) $first.addClass('lang-' + $first.attr('lang'));
      $first.addClass('prettyprint').addClass('linenums');
    }

    if (!$first.hasClass('with-lang-nav')) {
      if ($siblings.length) {
        var langs = [$first.attr('lang')],
            langSelector = $('<ul class="lang-selector"></ul>');

        if (tag != 'pre') langSelector.addClass('inline');

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

  $('h3 + blockquote, h6 + blockquote').each(function() { $(this).replaceWith('<code class="prettyprint">' + $(this).html() + '</code>'); });

  prettyPrint();
});