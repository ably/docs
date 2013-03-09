// exact contains sizzle matcher using lowercase
$.expr[":"].langequals = function(obj, index, meta, stack) {
  return ($(obj).attr('lang') || "").toLowerCase() == meta[3].toLowerCase();
};

$(function() {
  var friendlyLanguageNames = {
    "javascript": "Javascript",
    "java": "Java",
    "python": "Python",
    "ruby": "Ruby",
    "nodejs": "Node.js",
    "ios": "iOS",
    "csharp": "C# .Net",
    "cplusplus": "C++",
    "c": "C",
    "appcelerator": "Appcelerator",
    "phonegap": "PhoneGap",
    "html": "HTML"
  };

  function friendlyLanguageFromId(languageId) {
    return friendlyLanguageNames[languageId.toLowerCase()] || languageId;
  }

  // select language tab event callback for individual language element
  function selectLang() {
    var $this = $(this),
        selectedLang = $this.attr('lang'),
        langSelector = $this.parent('ul'),
        $first = langSelector.next(),
        tag = $first[0].nodeName.toLowerCase(),
        $siblings = $first.nextUntil(':not(' + tag + '),:not([lang])');

    langSelector.find('li').removeClass('selected');
    $(this).addClass('selected');
    $siblings.removeClass('selected');
    if ($first.attr('lang') == selectedLang) {
      $first.addClass('selected');
    } else {
      $first.removeClass('selected');
      $siblings.each(function() { if ($(this).attr('lang') == selectedLang) $(this).addClass('selected'); });
    }
  }

  // find all elements that have a language specified and make them language selectable
  $('pre:has(code),p[lang],span[lang],div[lang]').each(function() {
    var $first = $(this),
        tag = this.nodeName.toLowerCase(),
        $siblings = $first.nextUntil(':not(' + tag + '),:not([lang])'),
        dlParent = $first.parents('dl').length;

    // convert all pre formatted text except those within a definition list without a language to pretty code blocks
    // pre tags within dls without language are used for alternate paths
    if ( (tag === 'pre') && (!dlParent || (dlParent && $first.attr('lang'))) ) {
      if ($first.attr('lang')) $first.addClass('lang-' + $first.attr('lang'));
      $first.addClass('prettyprint').addClass('linenums');
    }

    // if element has with-lang-nav class, then this element has already been converted by this script when operating on one of it's siblings
    if (!$first.hasClass('with-lang-nav')) {
      if ($siblings.length) {
        var langs = [$first.attr('lang')],
            langSelector = $('<ul class="lang-selector"></ul>'),
            uniqueLangs = [];

        // pre blocks have navigation above as tabs
        // inline language selector is shown for all p/span/div tags instead, but has different more subtle styling, apply
        if (tag !== 'pre') langSelector.addClass('inline');

        // we will be building a nav so change the class so it's aware and this code block is selected
        $first.addClass('with-lang-nav').addClass('selected');

        // find all siblings and add to the language nav, and set up with correct class
        $siblings.each(function() { langs.push($(this).attr('lang').toLowerCase()); }).addClass('with-lang-nav');
        $.each(langs, function(i, el) { if($.inArray(el, uniqueLangs) === -1) uniqueLangs.push(el); });
        $.each(uniqueLangs, function(i, n) {
          langSelector.append('<li lang="' + n + '">' + friendlyLanguageFromId(n) + '</li>');
        });
        langSelector.find('li:first').addClass('selected');

        // insert nav before this first code block
        $first.before(langSelector);

        langSelector.on('click', 'li[lang]', selectLang);
      }
    }
  });

  // blockquote are used to indicate method code example blocks, which are valid, but need to be changed to code blocks for styling
  $('h3 + blockquote, h6 + blockquote').each(function() { $(this).replaceWith('<code class="prettyprint">' + $(this).html() + '</code>'); });

  var languages = {};
  $('ul.lang-selector li').each(function() {
    languages[$(this).text()] = true;
  });

  var globalLangContainer = $('<div class="global-lang-container"><ul></ul></div>'),
      langList = globalLangContainer.find('ul'),
      friendlyLang;
  for (var language in languages) {
    friendlyLang = friendlyLanguageFromId(language);
    if (language.toLowerCase() != 'default') langList.append('<li data-lang="' + language.toLowerCase() + '">' + friendlyLang + '</li>');
  }
  if (langList.find('li').length) $('body').append(globalLangContainer);

  // event callback for the global language navigation selection
  function selectGlobalLanguage() {
    var lang = $(this).data('lang');
    $(this).siblings('li').removeClass('selected');
    $(this).addClass('selected');
    $('ul.lang-selector').each(function() {
      var langSelector = $(this),
          languageTab = langSelector.find('li:not(.warning):langequals("' + lang + '")'),
          allOtherLanguagesTab = langSelector.find('li:not(.warning):langequals(default)'); // special tab that allows content to be dispayed as default
      if (languageTab.length) {
        selectLang.apply(languageTab);
        langSelector.hide();
      } else if (allOtherLanguagesTab.length) {
        selectLang.apply(allOtherLanguagesTab);
        langSelector.hide();
      } else {
        langSelector.show();
        langSelector.find('li.warning').remove();
        langSelector.append('<li class="warning">' + lang + ' is not supported</li>');
      }

      /* if language selector for this content area is not visible, and the element is a span, lets no longer show it as a block */
      var contentAreaTag = langSelector.next()[0].tagName.toLowerCase(),
          selectedSibling = langSelector.nextUntil(':not(' + contentAreaTag + '),:not([lang])').filter('.selected');

      if (!langSelector.is(':visible') && contentAreaTag == 'span') {
        selectedSibling.addClass('show-as-span');
      } else {
        selectedSibling.removeClass('show-as-span');
      }
    });
  }

  selectGlobalLanguage.apply(langList.find('li:first'));
  langList.on('click', 'li', selectGlobalLanguage);

  prettyPrint();
});