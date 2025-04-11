import React from 'react';
import { PageProps } from 'gatsby';

import '../../styles/global.css';
import PageTitle from '../PageTitle';
import { MarkdownProvider } from '../Markdown';
import Article from '../Article';

type PageContextType = {
  title: string;
};

type MDXWrapperProps = PageProps<unknown, PageContextType>;

const MDXWrapper: React.FC<MDXWrapperProps> = ({ children, pageContext }) => {
  const { title } = pageContext;

  return (
    <Article>
      <MarkdownProvider>
        {title && <PageTitle>{title}</PageTitle>}
        {children}
      </MarkdownProvider>
    </Article>
  );
};

export default MDXWrapper;
