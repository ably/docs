import React from 'react';
import PropType from 'prop-types';
import Html from '../Html';
import LocalLanguageAlternatives from '../wrappers/LocalLanguageAlternatives';
import HtmlDataTypes from '../../../../data/types/html';
import Code from '@ably/ui/core/Code/component';
import { languageSyntaxHighlighterNames } from '../../../maps/language';

const multilineRegex = /\r|\n/gm;

const Pre = ({ data, language, languages, altData, attribs }) => {
  const codeData = data.data;
  const codeAttribs = data.attribs;
  const isString = codeData && codeData.length === 1 && codeData[0].type === HtmlDataTypes.text;
  const hasRenderableLanguages = isString && codeAttribs && codeAttribs.lang;
  const hasMultilineText = isString && multilineRegex.test(codeData[0].data);

  const displayLanguage =
    codeAttribs && codeAttribs.lang && languageSyntaxHighlighterNames[codeAttribs.lang]
      ? languageSyntaxHighlighterNames[codeAttribs.lang]
      : languageSyntaxHighlighterNames['plaintext'];
  const PreWrappedCodeBlock =
    hasRenderableLanguages || hasMultilineText ? (
      <Code language={displayLanguage} snippet={codeData[0].data}></Code>
    ) : null;
  return PreWrappedCodeBlock;
};

Pre.propTypes = {
  data: PropType.array,
  language: PropType.string,
  languages: PropType.array,
  altData: PropType.object,
  attribs: PropType.object,
};

export default Pre;
