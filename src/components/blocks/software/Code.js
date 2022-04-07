/**
 * Source: Ably Voltaire src/components/code-block/code-block.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';

import styled from 'styled-components';

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
import { secondary } from '../../../styles/colors';

const Container = styled.div`
  position: relative;
  &::after {
    content: '${({ language }) => language}';
    position: absolute;
    top: 0;
    right: 0;
    color: #f5f5f6;
    background-color: #76767c;
    font-size: 10px;
    line-height: 1;
    padding: ${({ language }) => (language ? '6px' : 0)};
    border-bottom-left-radius: 4px;
  }
`;

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

const InlineCodeElement = styled.code`
  background-color: ${secondary.subtleOrange};
  padding: 2.5px 0;
`;

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
      className: 'p-32 overflow-auto',
    };
    return (
      <Container {...withModifiedAttribs} language={languageLabels[attribs.lang]}>
        <SyntaxHighlighter style={{ hljs: { background: 'inherit' } }} language={displayLanguage.key}>
          {data[0].data}
        </SyntaxHighlighter>
      </Container>
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
