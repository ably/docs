import React, { FunctionComponent } from 'react';
import { isArray } from 'lodash';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import { ArticleTypeContext } from '../../../contexts/article-type-context';
import { ARTICLE_TYPES } from '../../../../data/transform/constants';
import { defaultBlocksFromData } from '../create-blocks/default-blocks-from-data';
import { apiReferenceBlocksFromData } from '../create-blocks/api-reference-blocks-from-data';
import { BlockWrapper as DefaultBlockWrapper } from '../wrappers/BlockWrapper';

const Html = ({
  data,
  BlockWrapper = DefaultBlockWrapper,
}: {
  data: HtmlComponentProps<ValidReactElement>[] | string | null;
  BlockWrapper?: FunctionComponent;
}) => {
  if (isArray(data)) {
    return (
      <ArticleTypeContext.Consumer>
        {(articleType) => {
          const blockCreator =
            articleType === ARTICLE_TYPES.apiReference ? apiReferenceBlocksFromData : defaultBlocksFromData;
          return <BlockWrapper>{blockCreator(data)}</BlockWrapper>;
        }}
      </ArticleTypeContext.Consumer>
    );
  }

  return <>{data}</>;
};

export default Html;
