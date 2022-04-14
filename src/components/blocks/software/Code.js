import React from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import '@ably/ui/core/Code/component.css';
import '@ably/ui/core/styles.css';
import './styles.css';

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

import languageLabels, { languageSyntaxHighlighterNames } from '../../../maps/language';
import HtmlDataTypes from '../../../../data/types/html';
import { ChildPropTypes } from '../../../react-utilities';

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

const InlineCodeElement = ({ children, ...props }) => (
  <code {...props} className="font-mono font-semibold text-code p-4">
    {children}
  </code>
);

const multilineRegex = /\r|\n/gm;

const Code = ({ data, attribs }) => {
  const isString = data.length === 1 && data[0].type === HtmlDataTypes.text;
  const hasRenderableLanguages = isString && attribs && attribs.lang;
  const hasMultilineText = isString && multilineRegex.test(data[0].data);

  if (hasRenderableLanguages || hasMultilineText) {
    const displayLanguage =
      attribs.lang && languageSyntaxHighlighterNames[attribs.lang]
        ? languageSyntaxHighlighterNames[attribs.lang]
        : languageSyntaxHighlighterNames['plaintext'];
    const withModifiedAttribs = {
      ...attribs,
      className: `p-32 overflow-auto relative ui-text-code`,
    };
    return (
      <div {...withModifiedAttribs} language={languageLabels[attribs.lang]}>
        <SelectedLanguage language={displayLanguage} />
        <SyntaxHighlighter style={{ hljs: { background: 'inherit' } }} language={displayLanguage.key}>
          {data[0].data}
        </SyntaxHighlighter>
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
InlineCodeElement.propTypes = {
  children: ChildPropTypes,
};

export default Code;
