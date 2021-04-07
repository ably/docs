$(function () {
  var jumpToNav = $("select#jump-to-nav"),
    stickNavHeight = 80,
    navIsScrolling = false,
    inlineTOCs = $(".inline-toc ul");

  function findAnchorTag(anchorId) {
    var tags = "a,p,h1,h2,h3,h4,h5,h6",
      matchers = [];
    $.each(tags.split(","), function (index, tag) {
      matchers.push(tag + "[id='" + anchorId + "']");
    });
    return $(matchers.join(","));
  }

  function stripNamespace(text) {
    /* break on ::, ., or \ namespace separators */
    var parts = text.split(/::|\\|\./),
      splitter = text.match(/::|\\|\./g),
      lastPart = parts[parts.length - 1];

    if (splitter && (lastPart.match(/^[A-Z0-9]+$/) || lastPart.length <= 6)) {
      /* If the last part of the definition is a Ruby constant
         i.e. PresenceMessage::ACTION
         then show the class to add context.
         Equally, if the last part is very short
         i.e. PresenceMessage.Action
         then it to needs context */
      return parts[parts.length - 2] + splitter[splitter.length - 1] + lastPart;
    } else {
      return lastPart;
    }
  }

  // On selecting a nav section, scroll it into view
  var jumpToCallback = function (aid) {
    var idTag = findAnchorTag(aid);
    navIsScrolling = true;
    if (!idTag.length) {
      if (console.error) {
        console.error(
          "Hash tag target #" + aid + " is missing.  Could not scroll"
        );
      }
    } else {
      $("html, body").animate(
        { scrollTop: Math.round(idTag.offset().top) - stickNavHeight + "px" },
        "fast",
        function () {
          setTimeout(function () {
            navIsScrolling = false;
          }, 750);
        }
      );
      var newUrl = document.location.href.replace(/#[^#]*$/, "") + "#" + aid;
      if (window.history.pushState) {
        window.history.pushState(
          $("article:first").html(),
          document.title + " : " + aid,
          newUrl
        );
      } else {
        document.location.href = newUrl;
      }
    }
  };

  var syncNavsWithLanguageSpecificContent = function () {
    var matchers = [
      { nodes: jumpToNav.find("option[id]"), attribute: "id" },
      { nodes: inlineTOCs.find('a[href^="#"]'), attribute: "href" },
    ];

    $.each(matchers, function (item, matcher) {
      matcher.nodes.each(function () {
        var anchorId = $(this)
            .attr(matcher.attribute)
            .replace(/^(#|anchor-)/, ""),
          anchorTag = findAnchorTag(anchorId),
          languageContentWithinTag = anchorTag.find(
            "span[lang].lang-resource.selected"
          );

        // If there is no matching anchor tag, hide this navigation item
        if (anchorTag.is(":visible")) {
          if (anchorTag.find("ul.lang-selector").length > 0) {
            // Anchor contains language specific content, make sure the content is visible
            if (anchorTag.find(":visible").length > 0) {
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

  jumpToNav.on("change", function (evt) {
    var selected = $(this).find("option:selected"),
      aid = selected.attr("id").replace(/^anchor-/, "");
    if (aid) jumpToCallback(aid);
  });

  $(document).on("language-change", syncNavsWithLanguageSpecificContent);
  syncNavsWithLanguageSpecificContent();

  // if a user clicks on an anchor link, scroll nicely and position correctly
  $("a[href]").on("click", function (evt) {
    var href = $(this).attr("href");
    if (href.match(/^#.+/)) {
      jumpToCallback.call(this, href.replace(/^#/, ""));
      evt.preventDefault();
    }
  });

  // Once a user scrolls, just select the "jump to" nav option again
  // The main Ably website is smarter and keeps track of where the user is on the page
  var jumpToOption = $("select#jump-to-nav option:first")[0],
    sinceLastScroll = new Date().getTime();
  $(window).on("scroll", function () {
    if (!navIsScrolling && new Date().getTime() - sinceLastScroll > 250) {
      sinceLastScroll = new Date().getTime();
      if (jumpToNav.find("option:selected")[0] != jumpToOption) {
        $(jumpToOption).attr("selected", true);
      }
    }
  });

  // Enable the code editor for JSBin
  $("pre.code-editor.open-jsbin").each(function () {
    var addTryItButton = function () {
      if ($(this).hasClass("prettyprint")) {
        var binId = $(this)
            .attr("class")
            .match(/open-jsbin-(\w+)/i)[1],
          btn = $(
            '<a href="//jsbin.ably.io/' +
              binId +
              '/1/edit?javascript,live" target="_blank" class="try-it-button">Try it</a>'
          );
        $(this).append(btn);
      } else {
        setTimeout(addTryItButton, 500);
      }
    }.bind(this);
    addTryItButton();
  });

  /* Replace Handlebar variables with values such as API keys & tokens for demos */
  var preLangBlocks = $("pre[lang],code"),
    msSinceEpoch = new Date().getTime(),
    msSinceEpochBlocks,
    sSinceEpochBlocks;

  $.get("https://ably.com/ably-auth/api-key/docs", function (apiKey, status) {
    if (status === "success") {
      var keyName = apiKey.match(/([^\.]+\.[^:]+):.+/)[1],
        keySecret = apiKey.match(/[^\.]+\.[^:]+:(.+)/)[1];

      if (typeof window.onApiKeyRetrieved === "function") {
        window.onApiKeyRetrieved(apiKey);
      }

      var tokenValidity = 12 * 60 * 60 * 1000; // 12 hours

      new Ably.Rest({ key: apiKey }).auth.createTokenRequest(
        { ttl: tokenValidity, capability: JSON.stringify({ "*": ["*"] }) },
        null,
        function (err, token) {
          preLangBlocks.each(function () {
            this.innerHTML = insertKeyUsageWarning(this.innerHTML);
            this.innerHTML = this.innerHTML
              .replace(/{{API_KEY_NAME}}/g, keyName)
              .replace(/{{API_KEY_SECRET}}/g, keySecret)
              .replace(/{{API_KEY}}/g, apiKey)
              .replace(/{{API_KEY_BASE64}}/g, Base64.encode(apiKey))
              .replace(/{{APP_ID}}/g, keyName.split(".")[0])
              .replace(
                /{{SIGNED_TOKEN_REQUEST_EXAMPLE}}/g,
                JSON.stringify(token, null, "  ")
              );
          });
        }
      );
    }
  });

  $.get("https://ably.com/ably-auth/token/docs", function (token, status) {
    if (status === "success") {
      preLangBlocks.each(function () {
        this.innerHTML = this.innerHTML
          .replace(/{{TOKEN}}/g, token)
          .replace(/{{TOKEN_BASE64}}/g, Base64.encode(token));
      });
    }
  });

  preLangBlocks
    .each(function () {
      this.innerHTML = this.innerHTML
        .replace(
          /{{MS_SINCE_EPOCH}}/g,
          '<span class="ms-since-epoch">' + msSinceEpoch + "</span>"
        )
        .replace(
          /{{SECONDS_SINCE_EPOCH}}/g,
          '<span class="s-since-epoch">' +
            Math.round(msSinceEpoch / 1000) +
            "</span>"
        )
        .replace(/{{RANDOM_CHANNEL_NAME}}/g, getRandomChannelName());
    })
    .promise()
    .done(function () {
      window.setTimeout(function () {
        msSinceEpochBlocks = $("span.ms-since-epoch");
        sSinceEpochBlocks = $("span.s-since-epoch");

        window.setInterval(function () {
          msSinceEpoch = new Date().getTime();
          setTimeInBlocks(msSinceEpochBlocks, msSinceEpoch);
          setTimeInBlocks(sSinceEpochBlocks, Math.round(msSinceEpoch / 1000));
        }, 50);
      }, 2000); // wait for code formatter to update time blocks
    });

  function setTimeInBlocks(blocks, newValue) {
    blocks.each(function () {
      this.innerHTML = this.innerHTML.replace(/\d{6,}/, newValue);
    });
  }

  // Account for sticky header that overlaps the anchored link
  var adjustAnchor = function () {
    var $anchor = $(":target");

    if ($anchor.length > 0) {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $anchor.offset().top - stickNavHeight,
          },
          100
        );
    }
  };

  $(window).on("hashchange load", function () {
    adjustAnchor();
  });

  // Show modal to new users so that they know this is not the canonical documentation
  if (!$.cookie("acknowledged_bleeding_edge")) {
    $(".canonical-modal").show();
    $(".canonical-modal .continue a").on("click", function () {
      $.cookie("acknowledged_bleeding_edge", "true", {
        expires: 180,
        path: "/",
      });
      $(".canonical-modal").hide();
    });
  }
});

(function () {
  var nouns = "people history way art world information map two family government health system computer meat year thanks music person reading method data food understanding theory law bird literature problem software control knowledge power ability economics love internet television science library nature fact product idea temperature investment area society activity story industry media thing oven community definition safety quality development language management player variety video week security country exam movie organization equipment physics analysis policy series thought basis boyfriend direction strategy technology army camera freedom paper environment child instance month truth marketing university writing article department difference goal news audience fishing growth income marriage user combination failure meaning medicine philosophy teacher communication night chemistry disease disk energy nation road role soup advertising location success addition apartment education math moment painting politics attention decision event property shopping student wood competition distribution entertainment office population president unit category cigarette context introduction opportunity performance driver flight length magazine newspaper relationship teaching cell dealer finding lake member message phone scene appearance association concept customer death discussion housing inflation insurance mood woman advice blood effort expression importance opinion payment reality responsibility situation skill statement wealth application city county depth estate foundation people history way art world information map two family government health system computer meat year thanks music person reading method data food understanding theory law bird literature problem software control knowledge power ability economics love internet television science library nature fact product idea temperature investment area society activity story industry media thing oven community definition safety quality development language management player variety video week security country exam movie organization equipment physics analysis policy series thought basis boyfriend direction strategy technology army camera freedom paper environment child instance month truth marketing university writing article department difference goal news audience fishing growth income marriage user combination failure meaning medicine philosophy teacher communication night chemistry disease disk energy nation road role soup advertising location success addition apartment education math moment painting politics attention decision event property shopping student wood competition distribution entertainment office population president unit category cigarette context introduction opportunity performance driver flight length magazine newspaper relationship teaching cell dealer finding lake member message phone scene appearance association concept customer death discussion housing inflation insurance mood woman advice blood effort expression importance opinion payment reality responsibility situation skill statement wealth application city county depth estate foundation grandmother heart perspective photo recipe studio topic collection depression imagination passion percentage resource setting ad agency college connection criticism debt description memory patience secretary solution administration aspect attitude director personality psychology recommendation response selection storage version alcohol argument complaint contract emphasis highway loss membership possession preparation steak union agreement cancer currency employment engineering entry interaction mixture preference region republic tradition virus actor classroom delivery device difficulty drama election engine football guidance hotel owner priority protection suggestion tension variation anxiety atmosphere awareness bath bread candidate climate comparison confusion construction elevator emotion employee employer guest height leadership mall manager operation recording sample transportation charity cousin disaster editor efficiency excitement extent feedback guitar homework leader mom outcome permission presentation promotion reflection refrigerator resolution revenue session singer tennis basket bonus cabinet childhood".split(
    " "
  );
  window.randomChannelName = nouns[Math.floor(Math.random() * nouns.length)];
})();

(function () {
  var names = "James John Robert Michael William David Richard Charles Joseph Thomas Christopher Daniel Paul Mark Donald George Kenneth Steven Edward Brian Ronald Anthony Kevin Jason Matthew Gary Timothy Jose Larry Jeffrey Frank Scott Eric Stephen Andrew Raymond Gregory Joshua Jerry Dennis Walter Patrick Peter Harold Douglas Henry Carl Arthur Ryan Roger Joe Juan Jack Albert Jonathan Justin Terry Gerald Keith Samuel Willie Ralph Lawrence Nicholas Roy Benjamin Bruce Brandon Adam Harry Fred Wayne Billy Steve Louis Jeremy Aaron Randy Howard Eugene Carlos Russell Bobby Victor Martin Ernest Phillip Todd Jesse Craig Alan Shawn Clarence Sean Philip Chris Johnny Earl Jimmy Antonio Danny Bryan Tony Luis Mike Stanley Leonard Nathan Dale Manuel Rodney Curtis Norman Allen Marvin Vincent Glenn Jeffery Travis Jeff Chad Mary Patricia Linda Barbara Elizabeth Jennifer Maria Susan Margaret Dorothy Lisa Nancy Karen Betty Helen Sandra Donna Carol Ruth Sharon Michelle Laura Sarah Kimberly Deborah Jessica Shirley Cynthia Angela Melissa Brenda Amy Anna Rebecca Virginia Kathleen Pamela Martha Debra Amanda Stephanie Carolyn Christine Marie Janet Catherine Frances Ann Joyce Diane Alice Julie Heather Teresa Doris Gloria Evelyn Jean Cheryl Mildred Katherine Joan Ashley Judith Rose Janice Kelly Nicole Judy Christina Kathy Theresa Beverly Denise Tammy Irene Jane Lori Rachel Marilyn Andrea Kathryn Louise Sara Anne Jacqueline Wanda Bonnie Julia Ruby Lois Tina Phyllis Norma Paula Diana Annie Lillian Emily Robin Peggy Crystal Gladys Rita Dawn Connie Florence Tracy Edna Tiffany Carmen Rosa Cindy Grace Wendy Victoria Edith Kim Sherry Sylvia Josephine Thelma Shannon Sheila Ethel Ellen Elaine Marjorie Carrie Charlotte Monica Esther Pauline Emma Juanita Anita Rhonda Hazel Amber Eva Debbie April Leslie Clara Lucille Jamie Joanne Eleanor Valerie Danielle Megan Alicia Suzanne Michele Gail Bertha Darlene Veronica Jill Erin Geraldine Lauren Cathy Joann Lorraine Lynn Sally Regina Erica Beatrice Dolores Bernice Audrey Yvonne Annette June Samantha Marion Dana Stacy Ana Renee Ida Vivian Roberta Holly Brittany Melanie Loretta Yolanda Jeanette Laurie Katie Kristen Vanessa Alma Sue Elsie Beth Jeanne Vicki Carla Tara Rosemary Eileen".split(
    " "
  );
  window.randomName = names[Math.floor(Math.random() * names.length)];
})();

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
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function insertKeyUsageWarning(code) {
  let message =
    "API Keys should not be shared. The key here is intended solely for this example.";
  let currentLangRegexp = /lang="(.*?)"/g;
  let currentLang = currentLangRegexp.exec(code);
  if (currentLang != null) currentLang = currentLang[1];

  if (["php", "ruby", "python"].indexOf(currentLang) > -1) {
    message = `# ${message}`;
  } else {
    message = `// ${message}`;
  }
  return code.replace(
    /(<ol class="linenums">)(.*?)({{API_KEY}})/g,
    `$1<li class="L-1"><code class="code-editor open-jsbin"
            lang="${currentLang}"><span class="com">${message}</span></code></li>$2$3`
  );
}

function getRandomChannelName() {
  return window.randomChannelName;
}

function getRandomName() {
  return window.randomName;
}

function expander(e) {
  e.preventDefault();
  var { href } = e.target;

  var navParent = e.target.closest(".nav-parent");
  var isopen = navParent.classList.contains("show-items");
  var islinked = !/#$/.test(href);
  var iscurrent = window.location.href === href;
  var redirect = islinked && !isopen && !iscurrent;

  // redirect to non-open non-current pages
  // do not open the menu before the redirect
  // alternatively toggle visibililty
  return redirect
    ? (location.href = href)
    : navParent.classList.toggle("show-items");
}

$(function () {
  $("#sidebar").on("click", ".nav-trigger", expander);

  // Open the active sub-navigation
  var selected = $("#sidebar").find(".selected");
  if (selected) {
    selected.closest(".nav-parent").addClass("show-items");
  }
});
