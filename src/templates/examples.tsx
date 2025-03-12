import React, { useContext } from 'react';
import Markdown from 'markdown-to-jsx';
import { ExampleWithContent } from 'src/data/examples/types';
import UserContext from 'src/contexts/user-context';
import { getApiKey } from 'src/utilities/update-ably-connection-keys';
import Icon from '@ably/ui/core/Icon';
import ExamplesRenderer from 'src/components/Examples/ExamplesRenderer';
import Button from '@ably/ui/core/Button';

const Examples = ({ pageContext }: { pageContext: { example: ExampleWithContent } }) => {
  const { example } = pageContext;
  const userData = useContext(UserContext);
  const apiKey = getApiKey(userData);

  return (
    <>
      <div className="my-40">
        <div className="flex gap-4 items-center mb-20">
          <Icon name="icon-gui-chevron-left-micro" size="12px" />
          <span className="ui-text-menu4 text-neutral-900 dark:text-neutral-400 font-semibold">All examples</span>
        </div>
        <h1 className="ui-text-title mb-16">{example.name}</h1>
        <p className="ui-text-sub-header">{example.description}</p>
      </div>
      {/* {apiKey ? <ExamplesRenderer example={example} apiKey={apiKey} /> : <p>Loading...</p>} */}
      <div className="flex gap-40">
        {example.content ? (
          <div className="flex flex-col gap-40 max-w-[800px]">
            <Markdown
              options={{
                wrapper: React.Fragment,
                overrides: {
                  h1: {
                    component: ({ children }: { children: React.ReactNode }) => (
                      <h2 className="ui-text-title">{children}</h2>
                    ),
                  },
                  h2: {
                    component: ({ children }: { children: React.ReactNode }) => (
                      <h3 className="ui-text-sub-header">{children}</h3>
                    ),
                  },
                  h3: {
                    component: ({ children }: { children: React.ReactNode }) => (
                      <h4 className="ui-text-p1">{children}</h4>
                    ),
                  },
                  p: {
                    component: ({ children }: { children: React.ReactNode }) => (
                      <p className="ui-text-p1">{children}</p>
                    ),
                  },
                },
              }}
            >
              {example.content}
            </Markdown>
          </div>
        ) : null}
        <div className="flex flex-col gap-8 w-[260px]">
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
