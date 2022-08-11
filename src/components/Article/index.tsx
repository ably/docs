import React, { FunctionComponent as FC } from 'react';

const Article: FC<{ columns: number }> = ({ columns = 3, children }) => (
  <article className={`col-span-5 grid grid-cols-3 mt-12 ml-32 mr-32 md:col-span-3 md:ml-0 md:mr-0`}>
    {children}
  </article>
);

export default Article;
