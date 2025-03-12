import React, { PropsWithChildren, useContext, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { ExampleWithContent } from 'src/data/examples/types';
import UserContext from 'src/contexts/user-context';
import { getApiKey } from 'src/utilities/update-ably-connection-keys';
import Icon from '@ably/ui/core/Icon';
import ExamplesRenderer from 'src/components/Examples/ExamplesRenderer';
import Button from '@ably/ui/core/Button';
import { Link } from 'gatsby';
import { LanguageKey } from 'src/data/languages/types';

const MarkdownOverrides = {
  h1: {
    component: ({ children }: PropsWithChildren) => <h2 className="ui-text-h1">{children}</h2>,
  },
  h2: {
    component: ({ children }: PropsWithChildren) => <h3 className="ui-text-h3">{children}</h3>,
  },
  h3: {
    component: ({ children }: PropsWithChildren) => <h4 className="ui-text-h4">{children}</h4>,
  },
  p: {
    component: ({ children }: PropsWithChildren) => <p className="ui-text-p1">{children}</p>,
  },
  ul: {
    component: ({ children }: PropsWithChildren) => <ul className="ui-text-p1 list-disc ml-24">{children}</ul>,
  },
  ol: {
    component: ({ children }: PropsWithChildren) => (
      <ol className="ui-text-p1 list-decimal ml-24 [&_pre]:-ml-20 [&_pre]:mt-12 [&_pre]:mb-24">{children}</ol>
    ),
  },
  pre: {
    component: ({ children }: PropsWithChildren) => (
      <pre className="ui-text-code flex bg-neutral-100 dark:bg-neutral-1200 px-16 py-24 rounded-lg w-full">
        {children}
      </pre>
    ),
  },
  code: {
    component: ({ children }: PropsWithChildren) => <code className="ui-text-code font-bold">{children}</code>,
  },
  a: {
    component: ({ children, href }: PropsWithChildren<{ href: string }>) => (
      <a href={href} className="ui-link">
        {children}
      </a>
    ),
  },
};

const Examples = ({ pageContext }: { pageContext: { example: ExampleWithContent } }) => {
  const { example } = pageContext;
  const userData = useContext(UserContext);
  const apiKey = getApiKey(userData);

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
    }
  }, [activeLanguage]);

  const content = React.useMemo(() => example.files[activeLanguage]?.['README.md'], [example.files, activeLanguage]);

  return (
    <>
      <div className="my-40">
        <Link to="/docs/examples" className="flex gap-4 items-center mb-20">
          <Icon name="icon-gui-chevron-left-micro" size="16px" />
          <span className="ui-text-menu4 text-neutral-900 dark:text-neutral-400 font-semibold">All examples</span>
        </Link>
        <h1 className="ui-text-title mb-16">{example.name}</h1>
        <p className="ui-text-sub-header">{example.description}</p>
      </div>
      {apiKey ? (
        <ExamplesRenderer
          example={example}
          apiKey={apiKey}
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
        />
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex md:flex-row flex-col justify-between gap-40 mt-64">
        {content ? (
          <div className="flex flex-col gap-40 max-w-[800px] order-2 md:order-1">
            <Markdown
              options={{
                wrapper: React.Fragment,
                overrides: MarkdownOverrides,
              }}
            >
              {content}
            </Markdown>
          </div>
        ) : null}
        <div className="flex flex-col gap-8 w-full md:w-[260px] order-1 md:order-2 md:sticky md:top-80 self-start">
          <Button variant="secondary" rightIcon="icon-social-github">
            View on GitHub
          </Button>
          <Button variant="secondary" rightIcon="icon-gui-code-bracket-outline">
            View on CodeSandbox
          </Button>
        </div>
      </div>
    </>
  );
};

export default Examples;
