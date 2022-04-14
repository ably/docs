import React, { FunctionComponent as FC } from 'react';

const Article: FC<{ columns: number }> = ({ columns = 3, children }) => (
<<<<<<< HEAD
  <article className={`col-span-${columns} grid grid-cols-3 mt-12`}>{children}</article>
=======
  <article className={`col-span-${columns} grid grid-cols-3`}>{children}</article>
>>>>>>> 5d8c11bc0 ([EDX-91] version menu styling (#1376))
);

export default Article;
