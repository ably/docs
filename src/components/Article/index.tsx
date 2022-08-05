import React, { FunctionComponent as FC } from 'react';

const Article: FC = ({ children }) => (
  <article className={`col-span-3 2xl:col-span-5 grid grid-cols-3 mt-12`}>{children}</article>
);

export default Article;
