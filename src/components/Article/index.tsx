import React, { FunctionComponent as FC } from 'react';
import { ArticleFooter } from './ArticleFooter';

import { article } from './Article.module.css';

const Article: FC = ({ children }) => (
  <article className={article}>
    {children}
    <ArticleFooter />
  </article>
);

export default Article;
