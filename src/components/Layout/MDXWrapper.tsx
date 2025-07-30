import React, { PropsWithChildren, useState, createContext, useContext, useMemo } from 'react';
import { navigate, PageProps } from 'gatsby';
import CodeSnippet from '@ably/ui/core/CodeSnippet';
import type { CodeSnippetProps, SDKType } from '@ably/ui/core/CodeSnippet';
import cn from '@ably/ui/core/utils/cn';

import PageTitle from '../PageTitle';
import { Frontmatter, PageContextType } from './Layout';
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
import { Tiles } from './mdx/tiles';
import { Head } from '../Head';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { ProductName } from 'src/templates/template-data';
import { getMetaTitle } from '../common/meta-title';
import UserContext from 'src/contexts/user-context';

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

const WrappedCodeSnippet: React.FC<{ activePage: ActivePage } & CodeSnippetProps> = ({
  activePage,
  apiKeys,
  ...props
}) => {
  const { sdk, setSdk } = useSDK();

  return (
    <CodeSnippet
      {...props}
      lang={activePage.language}
      sdk={sdk}
      onChange={(lang, sdk) => {
        setSdk(sdk ?? null);
        navigate(`${location.pathname}?lang=${lang}`);
      }}
      className={cn(props.className, 'mb-5')}
      languageOrdering={
        activePage.product && languageData[activePage.product] ? Object.keys(languageData[activePage.product]) : []
      }
      apiKeys={apiKeys}
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

const META_DESCRIPTION_FALLBACK = `Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime. Organizations like Toyota, Bloomberg, HubSpot, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale.`;
const META_PRODUCT_FALLBACK = 'pub_sub';

const getFrontmatter = (frontmatter: Frontmatter, prop: keyof Frontmatter, alternative: string | string[] = '') =>
  frontmatter?.[prop] ? frontmatter[prop] : alternative;

const MDXWrapper: React.FC<MDXWrapperProps> = ({ children, pageContext, location }) => {
  const { frontmatter } = pageContext;

  const { activePage } = useLayoutContext();
  const [sdk, setSdk] = useState<SDKType>(
    (pageContext.languages
      ?.filter((language) => language.startsWith('realtime') || language.startsWith('rest'))
      ?.find((language) => activePage.language && language.endsWith(activePage.language))
      ?.split('_')[0] as SDKType) ?? null,
  );
  const userContext = useContext(UserContext);

  const title = getFrontmatter(frontmatter, 'title') as string;
  const description = getFrontmatter(frontmatter, 'meta_description', META_DESCRIPTION_FALLBACK) as string;
  const keywords = getFrontmatter(frontmatter, 'meta_keywords') as string;
  const metaTitle = getMetaTitle(title, (activePage.product as ProductName) || META_PRODUCT_FALLBACK) as string;

  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl(location.pathname);

  // Use the copyable headers hook
  useCopyableHeaders();

  const apiKeys = useMemo(() => {
    const apps =
      userContext.apps && userContext.apps.length > 0 && userContext.apps[0].apiKeys.length > 0 ? userContext.apps : [];

    // Check if there are any non-demo apps
    const hasNonDemo = apps.some(({ demo }) => !demo);

    const filteredApps = hasNonDemo ? apps.filter(({ demo }) => !demo) : apps;

    return filteredApps.length > 0
      ? filteredApps.flatMap(({ name, apiKeys, demo }) => ({
          app: demo ? 'demo' : name,
          keys: apiKeys.map((apiKey) => ({ name: apiKey.name, key: apiKey.whole_key })),
        }))
      : [{ app: 'demo', keys: [{ name: 'demo', key: 'demokey:123456' }] }];
  }, [userContext.apps]);

  return (
    <SDKContext.Provider value={{ sdk, setSdk }}>
      <Head title={title} metaTitle={metaTitle} canonical={canonical} description={description} keywords={keywords} />
      <Article>
        <MarkdownProvider
          components={{
            If,
            Code: (props) => <WrappedCodeSnippet activePage={activePage} apiKeys={apiKeys} {...props} />,
            Aside: WrappedAside,
            table: Table,
            thead: TableHead,
            tbody: TableBody,
            tr: TableRow,
            th: TableHeader,
            td: TableCell,
            Tiles,
          }}
        >
          <PageTitle>{title}</PageTitle>
          {children}
        </MarkdownProvider>
      </Article>
    </SDKContext.Provider>
  );
};

export default MDXWrapper;
