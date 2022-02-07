/**
 * Source: Ably Voltaire src/components/code-block/code-block.js
 */
import React from 'react';
import Html from '../Html';

import styled from 'styled-components';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import githubGist from 'react-syntax-highlighter/dist/cjs/styles/hljs/github-gist.js';

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

import { spacing, fonts, colors } from '../../../styles';
import { languageSyntaxHighlighterNames } from '../../../maps/language';
import HtmlDataTypes from '../../../../data/types/html';

const Container = styled.div`
  ${fonts.efficientBody}
  margin: 0 0 ${spacing.medium} 0;
  position: relative;

  &::after {
    content: '${({ language }) => language}';
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${colors.containers.one};
    font-size: 10px;
    line-height: 1;
    padding: ${({ language }) => (language ? '6px' : 0)};
    border-top-right-radius: 4px;
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

const Code = ({ data, attribs }) => {
    const isString = data.length === 1 && data[0].type === HtmlDataTypes.text && attribs && attribs.lang;

    if(isString) {
        const displayLanguage = attribs.lang && languageSyntaxHighlighterNames[attribs.lang]
            ? languageSyntaxHighlighterNames[attribs.lang]
            : languageSyntaxHighlighterNames['plaintext'];
        return <Container {...attribs}>
            <SyntaxHighlighter 
                customStyle={{
                    backgroundColor: colors.containers.three,
                    padding: '20px',
                    borderLeft: '10px solid ${colors.containers.one}',
                    borderRadius: '4px',
                    margin: 0,
                    }}
                    language={displayLanguage.key}
                    style={githubGist}
            >
                {data[0].data}
            </SyntaxHighlighter>
        </Container>;
    }
    return <code {...attribs}><Html data={ data } /></code>

}

export default Code;