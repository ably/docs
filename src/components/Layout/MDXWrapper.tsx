import React, { PropsWithChildren, useState, createContext, useContext } from 'react';
import { navigate, PageProps } from 'gatsby';
import CodeSnippet, { CodeSnippetProps, SDKType } from '@ably/ui/core/CodeSnippet';
import cn from '@ably/ui/core/utils/cn';

import PageTitle from '../PageTitle';
import { PageContextType } from './Layout';
import { MarkdownProvider } from '../Markdown';
import Article from '../Article';
import If from './mdx/If';
import { useCopyableHeaders } from './mdx/headers';
import { useLayoutContext } from 'src/contexts/layout-context';
import Aside from '../blocks/dividers/Aside';
import { HtmlComponentPropsData } from '../html-component-props';
import { languageData } from 'src/data/languages';
import { ActivePage } from './utils/nav';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from './mdx/tables';

type MDXWrapperProps = PageProps<unknown, PageContextType>;

// Create SDK Context
type SDKContextType = {
  sdk: SDKType;
  setSdk: (sdk: SDKType) => void;
};

const SDKContext = createContext<SDKContextType | undefined>(undefined);

const useSDK = () => {
  const context = useContext(SDKContext);
  if (!context) {
    throw new Error('useSDK must be used within an SDKProvider');
  }
  return context;
};

const WrappedCodeSnippet: React.FC<{ activePage: ActivePage } & CodeSnippetProps> = ({ activePage, ...props }) => {
  const { sdk, setSdk } = useSDK();

  return (
    <CodeSnippet
      lang={activePage.language}
      sdk={sdk}
      onChange={(lang, sdk) => {
        setSdk(sdk ?? null);
        navigate(`${location.pathname}?lang=${lang}`);
      }}
      className={cn(props.className, 'mb-20')}
      languageOrdering={
        activePage.product && languageData[activePage.product] ? Object.keys(languageData[activePage.product]) : []
      }
      {...props}
    />
  );
};

const WrappedAside = (props: PropsWithChildren<{ 'data-type': string }>) => {
  return (
    <Aside
      attribs={{ 'data-type': props['data-type'] }}
      data={(<>{props.children}</>) as unknown as HtmlComponentPropsData}
    />
  );
};

const MDXWrapper: React.FC<MDXWrapperProps> = ({ children, pageContext }) => {
  const { frontmatter } = pageContext;
  const title = frontmatter?.title;
  const { activePage } = useLayoutContext();
  const [sdk, setSdk] = useState<SDKType>(null);

  // Use the copyable headers hook
  useCopyableHeaders();

  return (
    <SDKContext.Provider value={{ sdk, setSdk }}>
      <Article>
        <MarkdownProvider
          components={{
            If,
            Code: (props) => <WrappedCodeSnippet activePage={activePage} {...props} />,
            Aside: WrappedAside,
            table: Table,
            thead: TableHead,
            tbody: TableBody,
            tr: TableRow,
            th: TableHeader,
            td: TableCell,
          }}
        >
          {title && <PageTitle>{title}</PageTitle>}
          {children}
        </MarkdownProvider>
      </Article>
    </SDKContext.Provider>
  );
};

export default MDXWrapper;
