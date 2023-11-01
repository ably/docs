import React, { FunctionComponent as FC } from 'react';
import { ArticleFooter } from './ArticleFooter';

const Article: FC<{ children: React.ReactNode }> = ({ children }) => (
  <article className="mt-72 md:mt-0 w-full px-24 md:pl-40 md:pr-48 xl:pr-64 overflow-x-hidden">
    {children}
    <ArticleFooter />
  </article>
);

export default Article;
