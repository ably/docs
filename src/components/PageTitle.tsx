import { FC, ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ children }) => (
  <h1 id="title" className="col-span-2 my-40 ui-text-h1">
    {children}
  </h1>
);

export default PageTitle;
