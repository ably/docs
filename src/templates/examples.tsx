import React, { PropsWithChildren, isValidElement, useContext, useEffect, useRef } from 'react';
import Markdown from 'markdown-to-jsx/react';
import { Link } from 'gatsby';
import LinkButton from 'src/components/ui/LinkButton';
import Icon from 'src/components/Icon';
import PlainCodeView from 'src/components/ui/CodeSnippet/PlainCodeView';
import { UnstyledOpenInCodeSandboxButton } from '@codesandbox/sandpack-react';

import { Head } from '../components/Head';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { ExampleWithContent } from 'src/data/examples/types';
import UserContext from 'src/contexts/user-context';
import { getApiKey } from 'src/utilities/update-ably-connection-keys';
import ExamplesRenderer from 'src/components/Examples/ExamplesRenderer';
import { LanguageKey } from 'src/data/languages/types';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { CodeBracketIcon, CommandLineIcon } from '@heroicons/react/24/outline';

const MarkdownOverrides = {
  // Headings map to the docs type scale + vertical rhythm. Elements are shifted down
  // one level (h1->h2, h2->h3, ...) because the example name is already the page <h1>.
  h1: {
    component: ({ children }: PropsWithChildren) => <h2 className="ui-text-h1 mb-6">{children}</h2>,
  },
  h2: {
    component: ({ children }: PropsWithChildren) => <h3 className="ui-text-h2 mt-12 mb-6">{children}</h3>,
  },
  h3: {
    component: ({ children }: PropsWithChildren) => <h4 className="ui-text-h3 mt-8 mb-5">{children}</h4>,
  },
  h4: {
    component: ({ children }: PropsWithChildren) => <h5 className="ui-text-h4 mt-7 mb-4">{children}</h5>,
  },
  p: {
    component: ({ children }: PropsWithChildren) => <p className="ui-text-p1 mb-3">{children}</p>,
  },
  ul: {
    component: ({ children }: PropsWithChildren) => <ul className="ui-unordered-list">{children}</ul>,
  },
  ol: {
    // markdown-to-jsx splits the list into one <ol> per step when code fences sit
    // between items (README fences are indented 4 spaces). It sets `start` on each <ol> to keep numbering continuous, so forward it.
    component: ({ children, ...props }: PropsWithChildren<{ start?: number }>) => (
      <ol {...props} className="ui-ordered-list">
        {children}
      </ol>
    ),
  },
  li: {
    component: ({ children }: PropsWithChildren) => <li className="ui-text-p1 mb-1">{children}</li>,
  },
  pre: {
    // Shell/terminal commands render through the shared terminal component (PlainCodeView),
    // matching the docs. Anything else falls back to a plain styled <pre>.
    component: ({ children }: PropsWithChildren) => {
      const codeEl = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
      const language = isValidElement(codeEl)
        ? (codeEl.props.className?.match(/lang(?:uage)?-([\w-]+)/)?.[1] ?? '')
        : '';
      const kids = isValidElement(codeEl) ? codeEl.props.children : undefined;
      const content =
        typeof kids === 'string'
          ? kids
          : Array.isArray(kids)
            ? kids.filter((c): c is string => typeof c === 'string').join('')
            : '';
      const isTerminal = ['sh', 'bash', 'zsh', 'shell', 'text'].includes(language);

      // `!mb-6` is important because when a code block is the last child of a list
      // item, `.ui-ordered-list li > *:last-of-type` (specificity 0,2,3) zeroes its
      // bottom margin. We want code to keep a full 24px top and bottom like elsewhere.
      if (content && isTerminal) {
        return (
          <PlainCodeView
            content={content}
            language={language}
            icon={language === 'text' ? null : <CommandLineIcon aria-hidden />}
            className="mt-6 !mb-6"
          />
        );
      }

      return (
        <pre className="ui-text-code flex bg-neutral-100 dark:bg-neutral-1200 px-4 py-6 rounded-lg w-full mt-6 !mb-6">
          {children}
        </pre>
      );
    },
  },
  code: {
    // Fenced (block) code carries a language className and inherits the <pre> styling;
    // inline code (no className) gets the docs inline-code chip.
    component: ({ children, className }: PropsWithChildren<{ className?: string }>) =>
      className ? (
        <code className={className}>{children}</code>
      ) : (
        <code className="ui-text-code-inline">{children}</code>
      ),
  },
  blockquote: {
    component: ({ children }: PropsWithChildren) => (
      <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-1000 pl-4 my-6">{children}</blockquote>
    ),
  },
  hr: {
    component: () => <hr className="my-8 border-neutral-300 dark:border-neutral-1000" />,
  },
  a: {
    component: ({ children, href }: PropsWithChildren<{ href: string }>) => (
      <a href={href} className="ui-link">
        {children}
      </a>
    ),
  },
  table: {
    component: ({ children }: PropsWithChildren) => (
      <div className="overflow-x-auto my-6">
        <table className="border-0 border-collapse mb-1 border-spacing-0 ui-text-p2 text-left">{children}</table>
      </div>
    ),
  },
  thead: {
    component: ({ children }: PropsWithChildren) => (
      <thead className="bg-gray-50 dark:bg-neutral-1200 border-b dark:border-neutral-1100">{children}</thead>
    ),
  },
  tbody: {
    component: ({ children }: PropsWithChildren) => (
      <tbody className="border-b dark:border-neutral-1100 divide-neutral-300 dark:divide-neutral-1100">
        {children}
      </tbody>
    ),
  },
  tr: {
    component: ({ children }: PropsWithChildren) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-neutral-1200 border-b dark:border-neutral-1100 divide-neutral-300 dark:divide-neutral-1100">
        {children}
      </tr>
    ),
  },
  th: {
    component: ({ children }: PropsWithChildren) => (
      <th className="px-3 py-2 text-left ui-text-p1 font-bold text-neutral-1100 dark:text-neutral-300 tracking-wider whitespace-nowrap">
        {children}
      </th>
    ),
  },
  td: {
    component: ({ children }: PropsWithChildren) => <td className="px-3 py-4 align-text-top text-sm">{children}</td>,
  },
};

const Examples = ({ pageContext }: { pageContext: { example: ExampleWithContent } }) => {
  const { canonicalUrl } = useSiteMetadata();
  const { example } = pageContext;
  const canonical = canonicalUrl(`/examples/${example.id}`);
  const meta_title = example.metaTitle || `Ably Examples | ${example.name}`;
  const meta_description = example.metaDescription || example.description;
  const userData = useContext(UserContext);
  const apiKey = getApiKey(userData, true);

  const isFirstRender = useRef(true);
  const [activeLanguage, setActiveLanguage] = React.useState<LanguageKey>(() => {
    // Get all available language keys from the example
    const languageKeys = Object.keys(example.files) as LanguageKey[];

    // Check if we have a language in the URL query parameters
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as LanguageKey | null;

      // If the lang parameter exists and is a valid language for this example, use it
      if (langParam && languageKeys.includes(langParam)) {
        return langParam;
      }
    }

    // Otherwise, default to the first available language
    return languageKeys[0];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('lang', activeLanguage);
      window.history.replaceState({}, '', window.location.pathname + '?' + urlParams.toString());

      // There is a bug in Sandpack where startRoute is lost on re-renders. This is a workaround to reintroduce it post-language change.
      if (example.id === 'pub-sub-message-encryption' || example.id === 'pub-sub-message-annotations') {
        if (isFirstRender.current) {
          isFirstRender.current = false;
        } else {
          setTimeout(() => {
            const iframe = document.querySelector('.sp-preview-iframe') as HTMLIFrameElement;
            if (iframe) {
              let queryParams = 'encrypted=true'; // for pub-sub-message-encryption
              if (example.id === 'pub-sub-message-annotations') {
                queryParams = 'clientId=user1';
              }
              iframe.setAttribute('src', iframe.getAttribute('src') + '?' + queryParams);
            }
          }, 100);
        }
      }
    }
  }, [activeLanguage, example.id]);

  const content = React.useMemo(() => example.files[activeLanguage]?.['README.md'], [example.files, activeLanguage]);

  return (
    <>
      <Head title={meta_title} canonical={canonical} description={meta_description} />
      <div className="my-10">
        <Link to="/examples" className="flex gap-1 items-center mb-5">
          <ChevronLeftIcon className="size-[16px]" aria-hidden />
          <span className="ui-text-menu4 text-neutral-900 dark:text-neutral-400 font-semibold">All examples</span>
        </Link>
        <h1 className="ui-text-h1 mb-4">{example.name}</h1>
        <p className="ui-text-sub-head">{example.description}</p>
      </div>
      {apiKey ? (
        <ExamplesRenderer
          example={example}
          apiKey={apiKey}
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
        >
          <div className="flex md:flex-row flex-col justify-between gap-10 mt-16">
            {content ? (
              <article className="max-w-[50rem] order-2 md:order-1">
                <Markdown
                  options={{
                    wrapper: React.Fragment,
                    overrides: MarkdownOverrides,
                  }}
                >
                  {content}
                </Markdown>
              </article>
            ) : null}
            <div className="flex flex-col gap-2 w-full md:w-[16.25rem] order-1 md:order-2 md:sticky md:top-20 self-start">
              <LinkButton
                href={
                  example.githubUrl ?? `https://github.com/ably/docs/tree/main/examples/${example.id}/${activeLanguage}`
                }
                target="_blank"
                variant="secondary"
                rightIcon={<Icon name="icon-social-github" />}
              >
                View on GitHub
              </LinkButton>
              <UnstyledOpenInCodeSandboxButton className="p-0">
                <LinkButton
                  href={'#'}
                  variant="secondary"
                  rightIcon={<CodeBracketIcon aria-hidden />}
                  className="w-full"
                >
                  View on CodeSandbox
                </LinkButton>
              </UnstyledOpenInCodeSandboxButton>
            </div>
          </div>
        </ExamplesRenderer>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Examples;
