import React from 'react';
import { defaultBlocksFromData } from '../create-blocks/default-blocks-from-data';
import { isArray } from 'lodash';
import ConditionalChildrenLanguageDisplay from '../wrappers/ConditionalChildrenLanguageDisplay';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import { ArticleTypeContext } from 'src/contexts/article-type-context';
import { ARTICLE_TYPES } from '../../../../data/transform/constants';
import apiReferenceBlocksFromData from '../create-blocks/api-reference-blocks-from-data';

const Html = ({ data }: HtmlComponentProps<ValidReactElement>) =>
  isArray(data) ? (
    <ArticleTypeContext.Consumer>
      {(articleType) => {
        const blockCreator =
          articleType === ARTICLE_TYPES.apiReference ? apiReferenceBlocksFromData : defaultBlocksFromData;
        return <ConditionalChildrenLanguageDisplay>{blockCreator(data)}</ConditionalChildrenLanguageDisplay>;
      }}
    </ArticleTypeContext.Consumer>
  ) : (
    <>{data}</>
  );

export default Html;
