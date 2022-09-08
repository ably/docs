import React, { FunctionComponent as FC } from 'react';
import '@ably/ui/core/styles.css';

const PageTitle: FC = ({ children }) => (
  <h1 id="title" className="ui-text-h1 my-40 col-span-2">
    {children}
  </h1>
);

export default PageTitle;
