import React, { FunctionComponent as FC } from 'react';

const Article: FC = ({ children }) => (
  <article className={`col-span-5 grid grid-cols-3 ml-32 mr-32 md:col-span-3 md:ml-0 md:mr-0 md:mt-12`}>
    {children}
  </article>
);

export default Article;
