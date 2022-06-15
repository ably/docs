import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Html from '../../Html';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import '@ably/ui/core/Code/component.css';
import '@ably/ui/core/styles.css';
import '../styles.css';

// Supported languages need to be imported here
// https://github.com/highlightjs/highlight.js/blob/master/SUPPORTED_LANGUAGES.md
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import ruby from 'react-syntax-highlighter/dist/cjs/languages/hljs/ruby';
import java from 'react-syntax-highlighter/dist/cjs/languages/hljs/java';
import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
import php from 'react-syntax-highlighter/dist/cjs/languages/hljs/php';
import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash';
import cs from 'react-syntax-highlighter/dist/cjs/languages/hljs/csharp';
import go from 'react-syntax-highlighter/dist/cjs/languages/hljs/go';
import xml from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml';
import cpp from 'react-syntax-highlighter/dist/cjs/languages/hljs/cpp';
import dart from 'react-syntax-highlighter/dist/cjs/languages/hljs/dart';
import swift from 'react-syntax-highlighter/dist/cjs/languages/hljs/swift';
import objectivec from 'react-syntax-highlighter/dist/cjs/languages/hljs/objectivec';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json';
// Android Studio has an error when registering the language.

import languageLabels, { languageSyntaxHighlighterNames } from '../../../../maps/language';
import HtmlDataTypes from '../../../../../data/types/html';
import UserContext, { devApiKeysPresent } from '../../../../contexts/user-context';
import APIKeyMenuSelector from './ApiKeyMenuSelector';
import InlineCodeElement from './InlineCodeElement';
import CodeCopyButton from './CodeCopyButton';

export const DEFAULT_API_KEY_MESSAGE = '<loading API key, please wait>';

const SelectedLanguage = ({ language }) =>
  language ? <div className="docs-language-label">{language.label}</div> : null;

SelectedLanguage.propTypes = {
  language: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.javascript.key, js);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.java.key, java);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.ruby.key, ruby);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.python.key, python);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.php.key, php);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.shell.key, bash);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.csharp.key, cs);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.go.key, go);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.html.key, xml);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.cpp.key, cpp);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.dart.key, dart);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.swift.key, swift);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.objc.key, objectivec);
SyntaxHighlighter.registerLanguage(languageSyntaxHighlighterNames.json.key, json);

const multilineRegex = /\r|\n/gm;

const Code = ({ data, attribs }) => {
  const [activeApiKey, setActiveApiKey] = useState({
    label: DEFAULT_API_KEY_MESSAGE,
    value: DEFAULT_API_KEY_MESSAGE,
  });
  const isString = data.length === 1 && data[0].type === HtmlDataTypes.text;
  const hasRenderableLanguages = isString && attribs && attribs.lang;
  const hasMultilineText = isString && multilineRegex.test(data[0].data);

  const content = data[0]?.data ?? '';
  /**
   * Refer to Decision Record:
   * https://ably.atlassian.net/wiki/spaces/ENG/pages/2070053031/DR9+API+Keys+vs+tokens+vs+authUrls+in+docs+code+snippets#Recommendation
   * Referenced on ticket:
   * https://ably.atlassian.net/browse/EDX-49
   */
  const contentWithObfuscatedKey = useMemo(
    () =>
      content.replace && content.replace(/{{API_KEY}}/g, '*********************************************************'),
    [content, activeApiKey],
  );
  const contentWithKey = useMemo(
    () => content.replace && content.replace(/{{API_KEY}}/g, activeApiKey.value),
    [content, activeApiKey],
  );

  if (hasRenderableLanguages || hasMultilineText) {
    const dataContainsKey = attribs['data-contains-key'] === 'true';
    const displayLanguage =
      attribs.lang && languageSyntaxHighlighterNames[attribs.lang]
        ? languageSyntaxHighlighterNames[attribs.lang]
        : languageSyntaxHighlighterNames['plaintext'];
    return (
      <div {...attribs} className="p-32 overflow-auto relative" language={languageLabels[attribs.lang]}>
        <UserContext.Consumer>
          {(value) => (
            <APIKeyMenuSelector
              dataContainsKey={dataContainsKey}
              userApiKeys={process.env.GATSBY_DOCS_API_KEYS ? devApiKeysPresent : value.apiKeys.data}
              setActiveApiKey={setActiveApiKey}
              activeApiKey={activeApiKey}
              signedIn={!!value.sessionState.signedIn || !!process.env.GATSBY_DOCS_SIGNED_IN}
            />
          )}
        </UserContext.Consumer>
        <SelectedLanguage language={displayLanguage} />
        <UserContext.Consumer>
          {(value) => (
            <SyntaxHighlighter
              className="ui-text-code"
              style={{ hljs: { background: 'inherit', fontSize: `var(--fs-code)`, lineHeight: `var(--lh-loose)` } }}
              language={displayLanguage.key}
            >
              {dataContainsKey
                ? value.sessionState.signedIn || !!process.env.GATSBY_DOCS_SIGNED_IN
                  ? contentWithObfuscatedKey
                  : contentWithKey
                : content}
            </SyntaxHighlighter>
          )}
        </UserContext.Consumer>
        <CodeCopyButton content={contentWithKey} />
      </div>
    );
  }
  return (
    <InlineCodeElement {...attribs}>
      <Html data={data} />
    </InlineCodeElement>
  );
};

Code.propTypes = {
  data: PropTypes.array,
  attribs: PropTypes.object,
};

export default Code;
