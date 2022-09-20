import React from 'react';
import { defaultBlocksFromData } from '../create-blocks/default-blocks-from-data';
import { apiReferenceBlocksFromData } from '../create-blocks/api-reference-blocks-from-data';
import { isArray } from 'lodash';
import ConditionalChildrenLanguageDisplay from '../wrappers/ConditionalChildrenLanguageDisplay';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import { ArticleTypeContext } from '../../../contexts/article-type-context';
import { ARTICLE_TYPES } from '../../../../data/transform/constants';
import { ApiReferenceConditionalChildrenLanguageDisplay } from '../wrappers/ApiReferenceConditionalChildrenLanguageDisplay';

const Html = ({ data }: { data: HtmlComponentProps<ValidReactElement>[] | string | null }) =>
  isArray(data) ? (
    <ArticleTypeContext.Consumer>
      {(articleType) => {
        let blockCreator = defaultBlocksFromData;
        let LanguageDisplayWrapper = ConditionalChildrenLanguageDisplay;
        if (articleType === ARTICLE_TYPES.apiReference) {
          blockCreator = apiReferenceBlocksFromData;
          LanguageDisplayWrapper = ApiReferenceConditionalChildrenLanguageDisplay;
        }
        return <LanguageDisplayWrapper>{blockCreator(data)}</LanguageDisplayWrapper>;
      }}
    </ArticleTypeContext.Consumer>
  ) : (
    <>{data}</>
  );

export default Html;
