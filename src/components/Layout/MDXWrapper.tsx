import React from 'react';
import { PageProps } from 'gatsby';

import '../../styles/global.css';
import PageTitle from '../PageTitle';
import { MarkdownProvider } from '../Markdown';

type PageContextType = {
  title: string;
};

type MDXWrapperProps = PageProps<unknown, PageContextType>;

const MDXWrapper: React.FC<MDXWrapperProps> = ({ children, pageContext }) => {
  const { title } = pageContext;

  return (
    <MarkdownProvider>
      {title && <PageTitle>{title}</PageTitle>}
      {children}
    </MarkdownProvider>
  );
};

export default MDXWrapper;
