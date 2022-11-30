import React, { FunctionComponent as FC } from 'react';
import cn from 'classnames';
import { ArticleFooter } from './ArticleFooter';

import { article } from './Article.module.css';

const Article: FC<{ hasTopBar?: boolean }> = ({ children, hasTopBar = false }) => (
  <article
    className={cn(article, {
      'pt-64': hasTopBar,
    })}
  >
    {children}
    <ArticleFooter />
  </article>
);

export default Article;
