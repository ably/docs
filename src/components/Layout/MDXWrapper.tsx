import React, {
  useState,
  createContext,
  isValidElement,
  cloneElement,
  useContext,
  useMemo,
  ReactNode,
  ReactElement,
} from 'react';
import { navigate, PageProps } from 'gatsby';
import CodeSnippet from '@ably/ui/core/CodeSnippet';
import type { CodeSnippetProps, SDKType } from '@ably/ui/core/CodeSnippet';
import cn from '@ably/ui/core/utils/cn';

import { getRandomChannelName } from '../../utilities/get-random-channel-name';

import If from './mdx/If';
import { useCopyableHeaders } from './mdx/headers';
import { Table, NestedTableProvider } from './mdx/NestedTable';
import { Tiles } from './mdx/tiles';
import { PageHeader } from './mdx/PageHeader';
import Admonition from './mdx/Admonition';
import { MethodSignature } from './mdx/MethodSignature';

import { Frontmatter, PageContextType } from './Layout';
import { ActivePage } from './utils/nav';

import { MarkdownProvider } from '../Markdown';

import Article from '../Article';
import { Head, StructuredData } from '../Head';
import { getMarkdownUrl } from '../../utilities/llm-urls';

import UserContext from 'src/contexts/user-context';
import { useLayoutContext } from 'src/contexts/layout-context';
import { languageData, languageInfo } from 'src/data/languages';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { getMetaTitle } from '../common/meta-title';
import { ProductName } from 'src/templates/template-data';

type MDXWrapperProps = PageProps<unknown, PageContextType>;

// Create SDK Context
type SDKContextType = {
  sdk: SDKType;
  setSdk: (sdk: SDKType) => void;
};

type Replacement = {
  term: string;
  replacer: () => string;
};

type ElementProps = { className?: string; children?: ReactNode };

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
  children,
  ...props
}) => {
  const { sdk, setSdk } = useSDK();

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
    // Utility languages that should be shown without warning (like JSON)
    const UTILITY_LANGUAGES = ['html', 'xml', 'css', 'sql', 'json'];

    const childrenArray = React.Children.toArray(processedChildren);

    // Check if this is a single child with a utility language
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

    if (!codeElement || !codeElement.props.className) {
      return null;
    }

    const className = codeElement.props.className as string;
    const langMatch = className.match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : null;

    // If it's a utility language, return the language to use as override
    return lang && UTILITY_LANGUAGES.includes(lang) ? lang : null;
  }, [processedChildren]);

  return (
    <CodeSnippet
      {...props}
      lang={utilityLanguageOverride || activePage.language}
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
    >
      {processedChildren}
    </CodeSnippet>
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
  const intro = getFrontmatter(frontmatter, 'intro') as string;
  const keywords = getFrontmatter(frontmatter, 'meta_keywords') as string;
  const metaTitle = getMetaTitle(title, (activePage.product as ProductName) || META_PRODUCT_FALLBACK) as string;

  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl(location.pathname);

  // Generate markdown URL for noscript fallback (uses shared utility for consistent URL handling)
  const markdownUrl = getMarkdownUrl(canonical);

  // Generate JSON-LD structured data for SEO
  const structuredData: StructuredData | undefined = useMemo(() => {
    if (!activePage.languages || activePage.languages.length <= 1) {
      return undefined;
    }

    // Create SoftwareSourceCode instances for each programming language
    const codeParts = activePage.languages.map((lang) => ({
      '@type': 'SoftwareSourceCode',
      programmingLanguage: languageInfo[lang]?.label ?? lang,
      url: canonicalUrl(`${location.pathname}?lang=${lang}`),
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: title,
      description: description,
      url: canonical,
      hasPart: codeParts,
    };
  }, [activePage.languages, title, description, canonical, location.pathname, canonicalUrl]);

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
      <Head
        title={title}
        metaTitle={metaTitle}
        canonical={canonical}
        description={description}
        keywords={keywords}
        structuredData={structuredData}
      />
      {/* Fallback for non-JS clients (LLMs, bots, screen readers with JS disabled) */}
      <noscript>
        <div
          style={{
            padding: '1rem',
            margin: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <p>
            <strong>Looking for machine-readable content?</strong>
          </p>
          <ul>
            <li>
              <a href={markdownUrl}>View this page as Markdown</a>
            </li>
            <li>
              <a href="/llms.txt">Browse all documentation pages (llms.txt)</a>
            </li>
          </ul>
          <p>
            <em>
              Tip: Request pages with <code>Accept: text/markdown</code> header or use a recognized LLM user agent to
              receive markdown directly.
            </em>
          </p>
        </div>
      </noscript>
      <Article>
        <NestedTableProvider>
          <MarkdownProvider
            components={{
              If,
              Code: (props) => <WrappedCodeSnippet activePage={activePage} apiKeys={apiKeys} {...props} />,
              Aside: Admonition,
              Table,
              table: Table.Root,
              thead: Table.Header,
              tbody: Table.Body,
              tr: Table.Row,
              th: Table.Head,
              td: Table.Cell,
              Tiles,
              MethodSignature,
            }}
          >
            <PageHeader title={title} intro={intro} />
            {children}
          </MarkdownProvider>
        </NestedTableProvider>
      </Article>
    </SDKContext.Provider>
  );
};

export default MDXWrapper;
