import React, { FunctionComponent as FC } from 'react';
import { ArticleFooter } from './ArticleFooter';

const Article: FC<{ children: React.ReactNode }> = ({ children }) => (
  <article className="mt-72 md:mt-0 flex-1 overflow-x-hidden">
    {children}
    <ArticleFooter />
  </article>
);

export default Article;
