import React, { FunctionComponent as FC } from 'react';

const Article: FC<{ columns: number }> = ({ columns = 3, children }) => (
  <article className={`col-span-${columns} grid grid-cols-3`}>{children}</article>
);

export default Article;
