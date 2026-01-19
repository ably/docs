'use client';

import { useState, useMemo, isValidElement, cloneElement, ReactNode, ReactElement, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import CodeSnippet from '@ably/ui/core/CodeSnippet';
import type { CodeSnippetProps, SDKType } from '@ably/ui/core/CodeSnippet';
import cn from '@ably/ui/core/utils/cn';

import { useUser, getApiKeysForCodeSnippet } from '@/lib/user-context';
import { useLayoutContext } from '@/lib/layout-context';
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

    const processChild = (child: ReactNode): ReactNode => {
      if (typeof child === 'string') {
        return replaceInString(child);
      }
      if (Array.isArray(child)) {
        return child.map(processChild);
      }
      if (isValidElement(child)) {
        const element = child as ReactElement<{ children?: ReactNode }>;
        return cloneElement(element, element.props, processChild(element.props.children));
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

interface MDXPageClientProps {
  mdxSource: MDXRemoteSerializeResult;
  frontmatter: FrontmatterData;
  slug: string;
}

export function MDXPageClient({ mdxSource, frontmatter, slug }: MDXPageClientProps) {
  const { activePage } = useLayoutContext();
  const userContext = useUser();

  const [sdk, setSdk] = useState<SDKType>(() => {
    // Determine initial SDK from page languages
    const pageLanguages = frontmatter.languages || [];
    const sdkLanguage = pageLanguages
      .filter((language: string) => language.startsWith('realtime') || language.startsWith('rest'))
      .find((language: string) => activePage.language && language.endsWith(activePage.language));
    return (sdkLanguage?.split('_')[0] as SDKType) ?? null;
  });

  // Use copyable headers hook
  useCopyableHeaders();

  // Get API keys for code snippets
  const apiKeys = useMemo(() => getApiKeysForCodeSnippet(userContext), [userContext]);

  const title = frontmatter.title || '';
  const intro = frontmatter.intro || '';

  // MDX components with API key injection
  const mdxComponents = useMemo(
    () => ({
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
