// exact contains sizzle matcher using lowercase
$.expr[":"].langequals = function(obj, index, meta, stack) {
  return ($(obj).attr('lang') || "").toLowerCase() == meta[3].toLowerCase();
};

$(function() {
  var friendlyLanguageNames = {
    <%= Ably::DOCUMENTATION_LANGUAGES.reject { |lang_d, lang| lang[:ignore_from_language_selector] }.map { |lang_id, lang| "\"#{lang_id}\": \"#{lang[:name]}\"" }.join(',') %>
  };
  var languageExtensions = {
    <%= Ably::DOCUMENTATION_LANGUAGES.map { |lang_id, lang| "\"#{lang_id}\": \"#{lang[:extension]}\"" }.join(',') %>
  };

  function friendlyLanguageFromId(languageId) {
    return friendlyLanguageNames[languageId.toLowerCase()] || languageId;
  }

  // select language tab event callback for individual language element
  function selectLang() {
    var $this = $(this);
    // when tabs should not be shown and no language block should be shown, $this is set to ul
    if ($this[0].nodeName.toLowerCase() == 'ul') {
      var $first = $(this).next(),
          $children = $first.nextUntil(':not(' + $first[0].nodeName.toLowerCase() + '),:not([lang])').addBack();
      $(this).find('> li').removeClass('selected');
      $children.removeClass('selected');
    } else {
      var selectedLang = $this.attr('lang'),
        langSelector = $this.parent('ul'),
        $first = langSelector.next(),
        tag = $first[0].nodeName.toLowerCase(),
        $languageElements = $first.nextUntil(':not(' + tag + (tag === 'dt' ? ',dd' : '') + '),:not([lang])').addBack();


      langSelector.find('li').removeClass('selected');
      $(this).addClass('selected'); // select the navigation tab
      $languageElements.removeClass('selected');
      $languageElements.each(function() { if ($(this).attr('lang') == selectedLang) $(this).addClass('selected'); });
    }
  }

  // transform all definitions with lang into valid language tags as Textile does not allow language to be assigned to dt or dd
  $('dl dt > div[lang]').each(function() {
    var lang = $(this).attr('lang');
    $(this).parent('dt').attr('lang', lang);
    $(this).parent('dt').next('dd').attr('lang', lang);
    $(this).removeAttr('lang');
  });

  // find all elements that have a language specified and make them language selectable
  $('pre[lang]:has(code),p[lang],span[lang],div[lang],h2[lang],h3[lang],h4[lang],dt[lang],dd[lang]').each(function() {
    var $first = $(this),
        tag = this.nodeName.toLowerCase(),
        $siblings = $first.nextUntil(':not(' + tag + (tag === 'dt' ? ',dd' : '') + '),:not([lang])'),
        dlParent = $first.parents('dl').length,
        hasLanguageNav = (tag === 'pre'),
        languageClass = hasLanguageNav ? 'with-lang-nav' : 'lang-resource';

    // convert all pre formatted text except those within a definition list without a language to pretty code blocks
    // pre tags within dls without language are used for alternate paths
    if ( hasLanguageNav && (!dlParent || (dlParent && $first.attr('lang'))) ) {
      if ($first.attr('lang')) $first.addClass('lang-' + languageExtensions[$first.attr('lang')]);
      $first.addClass('prettyprint').addClass('linenums');
    }

    // if element has class indicating it's a langauge resource, then this element has already been converted by this script when operating on one of it's siblings
    if (!$first.hasClass(languageClass)) {
      if ($siblings.length || !hasLanguageNav) {
        var langs = [$first.attr('lang')],
            langSelector = $('<ul class="lang-selector"></ul>'),
            uniqueLangs = [];

        // we will be building a nav so change the class so it's aware and this code block is selected
        $first.addClass(languageClass).addClass('selected');

        // find all siblings and add to the language nav, and set up with correct class
        $siblings.each(function() { langs.push($(this).attr('lang').toLowerCase()); }).addClass(languageClass);
        $.each(langs, function(i, el) { if($.inArray(el, uniqueLangs) === -1) uniqueLangs.push(el); });
        $.each(friendlyLanguageNames, function(key, val) {
          if (uniqueLangs.indexOf(key) !== -1) langSelector.append('<li lang="' + key + '">' + val + '</li>');
        });
        if (uniqueLangs.indexOf('default') !== -1) langSelector.append('<li lang="default">default</li>');
        langSelector.find('li:first').addClass('selected');

        // insert nav before this first code block
        $first.before(langSelector);
        if (!hasLanguageNav) langSelector.hide();

        langSelector.on('click', 'li[lang]', selectLang);
      }
    }
  });

  // blockquote are used to indicate method code example blocks, which are valid, but need to be changed to code blocks for styling
  $('h3 + blockquote, h6 + blockquote').each(function() { $(this).replaceWith('<code class="prettyprint">' + $(this).html() + '</code>'); });

  var languages = {};
  $('ul.lang-selector li[lang]').each(function() {
    languages[$(this).attr('lang').toLowerCase()] = true;
  });

  var globalLangContainer = $('<div class="global-lang-container"><ul></ul></div>'),
      langList = globalLangContainer.find('ul'),
      friendlyLang, langID;
  for (langID in friendlyLanguageNames) {
    friendlyLang = friendlyLanguageFromId(langID);
    if (languages[langID]) langList.append('<li data-lang="' + langID.toLowerCase() + '">' + friendlyLang + '</li>');
  }
  for (langID in langList) {
    if ((langID !== 'default') && !friendlyLanguageFromId(langID)) if (console.warn) console.warn('Language ' + langID + ' is not supported and not shown');
  }
  if (langList.find('li').length) $('body').append(globalLangContainer);

  // event callback for the global language navigation selection
  function selectGlobalLanguage(cookieStrategy) {
    var lang = $(this).data('lang'),
        friendlyLang = $(this).text();
    $(this).siblings('li').removeClass('selected');
    $(this).addClass('selected');
    if (cookieStrategy !== 'do-not-save') $.cookie("preferred_lang", lang, { expires : 31, path: '/' });

    $('ul.lang-selector').each(function() {
      var langSelector = $(this),
          inline = langSelector.next().hasClass('lang-resource'),
          languageTab = langSelector.find('li:not(.warning):langequals("' + lang + '")'),
          allOtherLanguagesTab = langSelector.find('li:not(.warning):langequals(default)'); // special tab that allows content to be dispayed as default
      if (languageTab.length) {
        selectLang.apply(languageTab);
        langSelector.hide();
      } else if (allOtherLanguagesTab.length) {
        selectLang.apply(allOtherLanguagesTab);
        langSelector.hide();
      } else {
        if (!inline) {
          langSelector.show();
          langSelector.find('li.warning').remove();
          langSelector.append('<li class="warning">No ' + friendlyLang + ' example exists</li>');
        } else {
          langSelector.hide();
          selectLang.call(langSelector);
        }
      }

      /* if language selector for this content area is not visible, and the element is a span, lets no longer show it as a block */
      var contentAreaTag = langSelector.next()[0].tagName.toLowerCase(),
          selectedSibling = langSelector.nextUntil(':not(' + contentAreaTag + '),:not([lang])').filter('.selected');
    });
  }

  if ($.cookie("preferred_lang") && langList.find('li[data-lang=' + $.cookie("preferred_lang") + ']').length) {
    selectGlobalLanguage.call(langList.find('li[data-lang=' + $.cookie("preferred_lang") + ']:first'), 'do-not-save');
  } else {
    selectGlobalLanguage.call(langList.find('li:first'), 'do-not-save');
  }
  langList.on('click', 'li', selectGlobalLanguage);

  prettyPrint();

  // clean up list definition headers which should not have trailing colon (:) which cannot be easily fixed with CSS alone
  $('dl dt > strong').parent().addClass('header');

  // simple roll over hint to explain why inline language copy has a dotted line around it
  $('.lang-resource').attr('title', 'This inline text is highlighted to indicate that it will change based on the language selected');
});