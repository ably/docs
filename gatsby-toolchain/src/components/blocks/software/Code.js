import React from 'react';
import Html from '../Html';

import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const Code = ({ data, attribs }) => <code {...attribs}><Html data={ data } /></code>;

export default Code;