import React, { FunctionComponent as FC } from 'react';

const Article: FC<{ children: React.ReactNode }> = ({ children }) => (
  <article className="flex-1 overflow-x-hidden px-4 -mx-4 relative z-10">{children}</article>
);

export default Article;
