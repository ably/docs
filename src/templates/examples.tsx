import React, { useContext, useMemo } from 'react';
import Markdown from 'markdown-to-jsx';
import { ExampleFiles, ExampleWithContent } from 'src/data/examples/types';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { sandpackTheme } from 'src/components/CodeEditor/SandpackTheme';
import { CodeEditor } from 'src/components/CodeEditor';
import { LanguageKey } from 'src/data/languages/types';
import UserContext from 'src/contexts/user-context';
import { getApiKey, updateAblyConnectionKey } from 'src/utilities/update-ably-connection-keys';

const Examples = ({ pageContext }: { pageContext: { example: ExampleWithContent } }) => {
  const { example } = pageContext;

  const determineSandpackTemplate = (language: LanguageKey) => {
    switch (language) {
      case 'javascript':
        return 'static';
      case 'react':
        return 'react-ts';
    }
  };

  const userData = useContext(UserContext);
  const apiKey = getApiKey(userData);
  const rewrittenFiles = useMemo<ExampleFiles>(() => {
    return Object.entries(example.files).reduce((acc, [languageKey, languageFiles]) => {
      return { ...acc, [languageKey]: updateAblyConnectionKey(languageFiles, apiKey) };
    }, {});
  }, [example.files, apiKey]);

  return (
    <>
      <h1 className="ui-text-title">{example.name}</h1>
      <p className="ui-text-sub-header">{example.description}</p>
      <hr />
      {apiKey ? (
        Object.entries(rewrittenFiles).map(([languageKey, languageFiles]) => (
          <React.Fragment key={languageKey}>
            <h2>
              {languageKey} ({determineSandpackTemplate(languageKey as LanguageKey)})
            </h2>
            <SandpackProvider
              files={languageFiles}
              customSetup={{
                dependencies: {
                  cors: '^2.8.5',
                  '@ably/chat': '^0.4.0',
                  '@ably/spaces': '^0.4.0',
                  ably: '^2.5.0',
                  nanoid: '^5.0.7',
                  minifaker: '1.34.1',
                  ...(languageKey === 'react' ? { react: '^18', 'react-dom': '^18', 'react-icons': '^5.4.0' } : {}),
                },
                devDependencies: {
                  typescript: '^4.0.0',
                },
                environment: languageKey === 'react' ? 'create-react-app' : 'parcel',
              }}
              options={{
                visibleFiles: example.visibleFiles,
                autorun: true,
                autoReload: true,
              }}
              theme={sandpackTheme}
              template={determineSandpackTemplate(languageKey as LanguageKey)}
            >
              <CodeEditor
                editor={{
                  showLineNumbers: true,
                }}
              />

              <div className="flex gap-16 my-16 flex-col sm:flex-row">
                <SandpackPreview
                  style={{ height: '480px' }}
                  className="rounded-lg overflow-hidden"
                  showOpenInCodeSandbox={false}
                  showRefreshButton
                />
                <SandpackPreview
                  style={{ height: '480px' }}
                  className="rounded-lg overflow-hidden"
                  showOpenInCodeSandbox={false}
                  startRoute="/?publisher=false"
                />
              </div>
            </SandpackProvider>
          </React.Fragment>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <hr />
      {example.content ? <Markdown>{example.content}</Markdown> : null}
    </>
  );
};

export default Examples;
