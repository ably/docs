import { FunctionComponent as FC } from 'react';

const PageTitle: FC = ({ children }) => (
  <h1 id="title" className="ui-text-h1 my-40 col-span-2 whitespace-nowrap overflow-x-scroll">
    {children}
  </h1>
);

export default PageTitle;
