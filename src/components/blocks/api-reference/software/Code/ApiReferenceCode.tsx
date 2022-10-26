import React from 'react';
import { every, some } from 'lodash/fp';
import HtmlDataTypes from '../../../../../../data/types/html';
import { multilineRegex, default as Code } from '../../../software/Code';
import { NestedHtmlComponentProps } from '../../../../html-component-props';
import { ApiReferenceInlineCodeElement } from './ApiReferenceInlineCodeElement';
import Html from '../../../Html';

export const ApiReferenceCode = ({ data, attribs }: NestedHtmlComponentProps<'div'>) => {
  const isString = every((child) => child.type === HtmlDataTypes.text, data);
  const hasRenderableLanguages = isString && attribs && attribs.lang;
  const hasMultilineText = isString && some((child) => multilineRegex.test(child.data as string), data);

  if (hasRenderableLanguages || hasMultilineText) {
    return <Code data={data} attribs={attribs} />;
  }
  return (
    <ApiReferenceInlineCodeElement {...attribs}>
      <Html data={data} />
    </ApiReferenceInlineCodeElement>
  );
};
