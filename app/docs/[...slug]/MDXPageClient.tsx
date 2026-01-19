'use client';

import { useState, useMemo, useEffect, isValidElement, cloneElement, ReactNode, ReactElement, createContext, useContext, FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import CodeSnippet from '@ably/ui/core/CodeSnippet';
import type { CodeSnippetProps, SDKType } from '@ably/ui/core/CodeSnippet';
import cn from '@ably/ui/core/utils/cn';

import { useUser, getApiKeysForCodeSnippet } from '@/lib/user-context';
import { useLayoutContext, Frontmatter } from '@/lib/layout-context';
import { useCopyableHeaders } from '@/src/components/Layout/mdx/headers';
import { getRandomChannelName } from '@/src/utilities/get-random-channel-name';
import { FrontmatterData } from '@/lib/mdx';
import { languageData } from '@/src/data/languages';

import If from '@/src/components/Layout/mdx/If';
import Table from '@/src/components/Layout/mdx/Table';
import { Tiles } from '@/src/components/Layout/mdx/tiles';
import { PageHeader } from '@/src/components/Layout/mdx/PageHeader';
import Admonition from '@/src/components/Layout/mdx/Admonition';
import Article from '@/src/components/Article';
import Link from '@/src/components/Link';
import { CodeBlock } from '@/src/components/Markdown/CodeBlock';
import { checkLinkIsInternal } from '@/src/utilities/link-checks';

// SDK Context for code snippets
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

type Replacement = {
  term: string;
  replacer: () => string;
};

type ElementProps = { className?: string; children?: ReactNode };

// Wrapped CodeSnippet with API key injection
interface WrappedCodeSnippetProps extends CodeSnippetProps {
  apiKeys: ReturnType<typeof getApiKeysForCodeSnippet>;
}

const WrappedCodeSnippet: React.FC<WrappedCodeSnippetProps> = ({
  apiKeys,
  children,
  ...props
}) => {
  const { sdk, setSdk } = useSDK();
  const { activePage } = useLayoutContext();
  const router = useRouter();

  const replacements: Replacement[] = useMemo(
    () => [{ term: 'RANDOM_CHANNEL_NAME', replacer: getRandomChannelName }],
    [],
  );

  const processedChildren = useMemo(() => {
    const replaceInString = (str: string) => {
      let result = str;
      replacements.forEach(({ term, replacer }) => {
        const regex = new RegExp(`{{${term}}}`, 'g');
        result = result.replace(regex, replacer());
      });
      return result;
    };

    const processChild = (child: ReactNode, index?: number): ReactNode => {
      if (typeof child === 'string') {
        return replaceInString(child);
      }
      if (Array.isArray(child)) {
        return child.map((c, i) => processChild(c, i));
      }
      if (isValidElement(child)) {
        const element = child as ReactElement<{ children?: ReactNode; key?: string | number }>;
        const key = element.key ?? index;
        return cloneElement(element, { ...element.props, key }, processChild(element.props.children));
      }
      return child;
    };

    return processChild(children);
  }, [children, replacements]);

  // Check if this code block contains only a single utility language
  const utilityLanguageOverride = useMemo(() => {
    const UTILITY_LANGUAGES = ['html', 'xml', 'css', 'sql', 'json'];
    const childrenArray = Array.isArray(processedChildren) ? processedChildren : [processedChildren];

    if (childrenArray.length !== 1) {
      return null;
    }

    const child = childrenArray[0];
    if (!isValidElement(child)) {
      return null;
    }

    const preElement = child as ReactElement<ElementProps>;
    const codeElement = isValidElement(preElement.props?.children)
      ? (preElement.props.children as ReactElement<ElementProps>)
      : null;

    if (!codeElement || !codeElement.props?.className) {
      return null;
    }

    const className = codeElement.props.className as string;
    const langMatch = className.match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : null;

    return lang && UTILITY_LANGUAGES.includes(lang) ? lang : null;
  }, [processedChildren]);

  return (
    <CodeSnippet
      {...props}
      lang={utilityLanguageOverride || activePage.language}
      sdk={sdk}
      onChange={(lang, newSdk) => {
        setSdk(newSdk ?? null);
        router.push(`${window.location.pathname}?lang=${lang}`, { scroll: false });
      }}
      className={cn(props.className, 'mb-5')}
      languageOrdering={
        activePage.product && languageData[activePage.product]
          ? Object.keys(languageData[activePage.product])
          : []
      }
      apiKeys={apiKeys}
    >
      {processedChildren}
    </CodeSnippet>
  );
};

// Styled HTML element components for MDX
const H1: FC<JSX.IntrinsicElements['h1']> = ({ children, ...props }) => (
  <h1 className="ui-text-h1 my-10" {...props}>
    {children}
  </h1>
);

const H2: FC<JSX.IntrinsicElements['h2']> = ({ children, ...props }) => (
  <h2 className="ui-text-h2 my-8" {...props}>
    {children}
  </h2>
);

const H3: FC<JSX.IntrinsicElements['h3']> = ({ children, ...props }) => (
  <h3 className="ui-text-h3 my-5" {...props}>
    {children}
  </h3>
);

const H4: FC<JSX.IntrinsicElements['h4']> = ({ children, ...props }) => (
  <h4 className="ui-text-h4 my-5" {...props}>
    {children}
  </h4>
);

const H5: FC<JSX.IntrinsicElements['h5']> = ({ children, ...props }) => (
  <h5 className="ui-text-h5 my-5" {...props}>
    {children}
  </h5>
);

const Paragraph: FC<JSX.IntrinsicElements['p']> = ({ children, ...props }) => (
  <p className="ui-text-p2 mb-5" {...props}>
    {children}
  </p>
);

const Ol: FC<JSX.IntrinsicElements['ol']> = ({ children, ...props }) => (
  <ol className="ui-ordered-list" {...props}>
    {children}
  </ol>
);

const Ul: FC<JSX.IntrinsicElements['ul']> = ({ children, ...props }) => (
  <ul className="ui-unordered-list" {...props}>
    {children}
  </ul>
);

const Li: FC<JSX.IntrinsicElements['li']> = ({ children, ...props }) => (
  <li className="ui-text-p2 mb-2" {...props}>
    {children}
  </li>
);

const InlineCode: FC<JSX.IntrinsicElements['code']> = ({ children, ...props }) => (
  <code className="ui-text-code-inline" {...props}>
    {children}
  </code>
);

const Pre: FC<JSX.IntrinsicElements['pre']> = ({ children }) => {
  const lang = (children as React.ReactElement)?.props?.className?.replace('language-', '');

  return (
    <div className="mb-5">
      <CodeBlock language={lang || 'javascript'}>{children}</CodeBlock>
    </div>
  );
};

const Anchor: FC<JSX.IntrinsicElements['a']> = ({ children, href, ...props }) => {
  const searchParams = useSearchParams();

  let cleanHref = href;

  // Add lang param from current URL if available
  const langParam = searchParams.get('lang');

  if (langParam && cleanHref && checkLinkIsInternal(cleanHref)) {
    const url = new URL(cleanHref, 'https://ably.com');
    url.searchParams.set('lang', langParam);
    cleanHref = url.pathname + url.search;
  }

  return (
    <Link to={cleanHref ?? '#'} className="ui-link" {...props}>
      {children}
    </Link>
  );
};

interface MDXPageClientProps {
  mdxSource: MDXRemoteSerializeResult;
  frontmatter: FrontmatterData;
  slug: string;
}

export function MDXPageClient({ mdxSource, frontmatter, slug }: MDXPageClientProps) {
  const { activePage, setPageContext } = useLayoutContext();
  const userContext = useUser();

  const [sdk, setSdk] = useState<SDKType>(() => {
    // Determine initial SDK from page languages
    const pageLanguages = frontmatter.languages || [];
    const sdkLanguage = pageLanguages
      .filter((language: string) => language.startsWith('realtime') || language.startsWith('rest'))
      .find((language: string) => activePage.language && language.endsWith(activePage.language));
    return (sdkLanguage?.split('_')[0] as SDKType) ?? null;
  });

  // Set page context with frontmatter for Footer and other components
  useEffect(() => {
    setPageContext({
      frontmatter: frontmatter as Frontmatter,
    });
    return () => {
      setPageContext({});
    };
  }, [frontmatter, setPageContext]);

  // Use copyable headers hook
  useCopyableHeaders();

  // Get API keys for code snippets
  const apiKeys = useMemo(() => getApiKeysForCodeSnippet(userContext), [userContext]);

  const title = frontmatter.title || '';
  const intro = frontmatter.intro || '';

  // MDX components with API key injection and styled HTML elements
  const mdxComponents = useMemo(
    () => ({
      // Custom components
      If,
      Code: (props: CodeSnippetProps) => (
        <WrappedCodeSnippet apiKeys={apiKeys} {...props} />
      ),
      Aside: Admonition,
      Table,
      table: Table.Root,
      thead: Table.Header,
      tbody: Table.Body,
      tr: Table.Row,
      th: Table.Head,
      td: Table.Cell,
      Tiles,
      // Styled HTML elements
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      h5: H5,
      p: Paragraph,
      a: Anchor,
      ol: Ol,
      ul: Ul,
      li: Li,
      code: InlineCode,
      pre: Pre,
    }),
    [apiKeys],
  );

  return (
    <SDKContext.Provider value={{ sdk, setSdk }}>
      <Article>
        <PageHeader title={title} intro={intro} />
        <MDXRemote {...mdxSource} components={mdxComponents} />
      </Article>
    </SDKContext.Provider>
  );
}
