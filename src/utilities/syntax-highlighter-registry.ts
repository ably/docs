// This file can be used in the browser, but because of the weight of all the language
// definitions, preferably it should be used on the server.

import type { LanguageFn } from 'highlight.js';
import bash from 'highlight.js/lib/languages/bash';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import dart from 'highlight.js/lib/languages/dart';
import dos from 'highlight.js/lib/languages/dos';
import diff from 'highlight.js/lib/languages/diff';
import erlang from 'highlight.js/lib/languages/erlang';
import elixir from 'highlight.js/lib/languages/elixir';
import plaintext from 'highlight.js/lib/languages/plaintext';
import go from 'highlight.js/lib/languages/go';
import http from 'highlight.js/lib/languages/http';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import objectivec from 'highlight.js/lib/languages/objectivec';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import swift from 'highlight.js/lib/languages/swift';
import kotlin from 'highlight.js/lib/languages/kotlin';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import curl from 'highlightjs-curl/src/languages/curl';

const registry: { label: string; key: string; module: LanguageFn }[] = [
  { label: 'Text', key: 'text', module: plaintext },
  { label: 'JS', key: 'javascript', module: javascript },
  { label: 'TS', key: 'typescript', module: typescript },
  { label: 'Java', key: 'java', module: java },
  { label: 'Ruby', key: 'ruby', module: ruby },
  { label: 'Python', key: 'python', module: python },
  { label: 'PHP', key: 'php', module: php },
  { label: 'Shell', key: 'bash', module: bash },
  { label: 'C#', key: 'cs', module: csharp },
  { label: 'CSS', key: 'css', module: css },
  { label: 'Go', key: 'go', module: go },
  { label: 'HTML', key: 'xml', module: xml },
  { label: 'HTTP', key: 'http', module: http },
  { label: 'C++', key: 'cpp', module: cpp },
  { label: 'Dart', key: 'dart', module: dart },
  { label: 'Swift', key: 'swift', module: swift },
  { label: 'Kotlin', key: 'kotlin', module: kotlin },
  { label: 'Objective C', key: 'objectivec', module: objectivec },
  { label: 'Node.js', key: 'javascript', module: javascript },
  { label: 'JSON', key: 'json', module: json },
  { label: 'DOS', key: 'dos', module: dos },
  { label: 'YAML', key: 'yaml', module: yaml },
  { label: 'Erlang', key: 'erlang', module: erlang },
  { label: 'Elixir', key: 'elixir', module: elixir },
  { label: 'Diff', key: 'diff', module: diff },
  { label: 'SQL', key: 'sql', module: sql },
  { label: 'cURL', key: 'curl', module: curl },
  { label: 'HTML', key: 'html', module: xml },
  { label: 'XML', key: 'xml', module: xml },
];

export default registry;
