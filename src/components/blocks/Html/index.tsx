import React from 'react';
import { defaultBlocksFromData } from '../create-blocks/default-blocks-from-data';
import { apiReferenceBlocksFromData } from '../create-blocks/api-reference-blocks-from-data';
import { isArray } from 'lodash';
import ConditionalChildrenLanguageDisplay from '../wrappers/ConditionalChildrenLanguageDisplay';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import { ArticleTypeContext } from '../../../contexts/article-type-context';
import { ARTICLE_TYPES } from '../../../../data/transform/constants';

const Html = ({ data }: { data: HtmlComponentProps<ValidReactElement>[] | string | null }) =>
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
