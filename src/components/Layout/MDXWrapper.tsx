import React, { PropsWithChildren } from 'react';
import { navigate, PageProps } from 'gatsby';
import CodeSnippet, { CodeSnippetProps } from '@ably/ui/core/CodeSnippet';
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

type MDXWrapperProps = PageProps<unknown, PageContextType>;

const MDXWrapper: React.FC<MDXWrapperProps> = ({ children, pageContext }) => {
  const { frontmatter } = pageContext;
  const title = frontmatter?.title;
  const { activePage } = useLayoutContext();

  // Use the copyable headers hook
  useCopyableHeaders();

  const WrappedCodeSnippet: React.FC<CodeSnippetProps> = (props) => {
    return (
      <CodeSnippet
        lang={activePage.language}
        onChange={(lang) => {
          navigate(`${location.pathname}?lang=${lang}`);
        }}
        className={cn(props.className, 'mb-20')}
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

  // Table components with responsive styling
  const Table = (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  );

  const TableHead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-50 border-b" {...props} />
  );

  const TableBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-gray-200" {...props} />
  );

  const TableRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr className="hover:bg-gray-50" {...props} />;

  const TableHeader = (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className="px-8 py-8 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
      {...props}
    />
  );

  const TableCell = (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td className="px-6 py-4 text-sm" {...props} />
  );

  return (
    <Article>
      <MarkdownProvider
        components={{
          If,
          Code: WrappedCodeSnippet,
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
  );
};

export default MDXWrapper;
