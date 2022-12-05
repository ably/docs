import React, { FunctionComponent as FC } from 'react';
import cn from 'classnames';
import { ArticleFooter } from './ArticleFooter';

const Article: FC<{ hasTopBar?: boolean }> = ({ children, hasTopBar = false }) => (
  <article
    className={cn('md:mt-12 w-full px-24 md:pl-40 md:pr-48 xl:pr-64 col-start-2 xxl:col-start-1', {
      'pt-64': hasTopBar,
    })}
  >
    {children}
    <ArticleFooter />
  </article>
);

export default Article;
