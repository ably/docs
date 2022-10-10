import React from 'react';
import HtmlDataTypes from '../../../../../../data/types/html';
import { multilineRegex, default as Code } from '../../../software/Code';
import { NestedHtmlComponentProps } from '../../../../html-component-props';
import { ApiReferenceInlineCodeElement } from './ApiReferenceInlineCodeElement';
import Html from '../../../Html';

export const ApiReferenceCode = ({ data, attribs }: NestedHtmlComponentProps<'div'>) => {
  const hasSingleString = data?.[0]?.type === HtmlDataTypes.text;
  const singleStringHasMultilineText = hasSingleString && multilineRegex.test(data?.[0].data as string);
  const hasRenderableLanguages = attribs && attribs.lang;
  const hasMultilineText = singleStringHasMultilineText || data.length > 1;
  if (attribs?.lang === 'csharp') {
    console.log(hasMultilineText, data);
  }
  if (hasRenderableLanguages || hasMultilineText) {
    return <Code data={data} attribs={attribs} />;
  }
  return (
    <ApiReferenceInlineCodeElement {...attribs}>
      <Html data={data} />
    </ApiReferenceInlineCodeElement>
  );
};
