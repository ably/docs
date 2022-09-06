import React from 'react';
import { defaultBlocksFromData } from '../create-blocks/default-blocks-from-data';
import { isArray } from 'lodash';
import ConditionalChildrenLanguageDisplay from '../wrappers/ConditionalChildrenLanguageDisplay';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';

const Html = ({ data }: HtmlComponentProps<ValidReactElement>) =>
  isArray(data) ? (
    <ConditionalChildrenLanguageDisplay>{defaultBlocksFromData(data)}</ConditionalChildrenLanguageDisplay>
  ) : (
    <>{data}</>
  );

export default Html;
