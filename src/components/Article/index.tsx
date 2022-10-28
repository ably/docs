import React, { FunctionComponent as FC } from 'react';
import { ArticleFooter } from './ArticleFooter';

const Article: FC = ({ children }) => (
  <article
    className={`col-span-5 grid grid-cols-3 ml-32 mr-32 md:col-span-3 2xl:col-start-2 2xl:col-end-6 md:ml-0 md:mr-0 md:mt-12 md:px-48`}
  >
    {children}
    <ArticleFooter />
  </article>
);

export default Article;
