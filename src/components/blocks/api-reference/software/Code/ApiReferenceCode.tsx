import React from 'react';
import HtmlDataTypes from '../../../../../../data/types/html';
import { multilineRegex, default as Code } from '../../../software/Code';
import { NestedHtmlComponentProps } from '../../../../html-component-props';
import { isString } from 'lodash';
import { ApiReferenceInlineCodeElement } from './ApiReferenceInlineCodeElement';
import Html from '../../../Html';

export const ApiReferenceCode = ({ data, attribs }: NestedHtmlComponentProps<'div'>) => {
  const containsString = !isString(data) && data.length === 1 && data[0].type === HtmlDataTypes.text;
  const hasRenderableLanguages = containsString && attribs && attribs.lang;
  const hasMultilineText = containsString && multilineRegex.test(data[0].data as string);
  if (hasRenderableLanguages || hasMultilineText) {
    return <Code data={data} attribs={attribs} />;
  }
  return (
    <ApiReferenceInlineCodeElement {...attribs}>
      <Html data={data} />
    </ApiReferenceInlineCodeElement>
  );
};
