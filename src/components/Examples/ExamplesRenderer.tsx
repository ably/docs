import React, { useMemo } from 'react';
import { SandpackProvider, SandpackPreview, SandpackConsole } from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';
import { CodeEditor } from 'src/components/CodeEditor';
import { LanguageKey } from 'src/data/languages/types';
import { ExampleFiles, ExampleWithContent } from 'src/data/examples/types';
import { updateAblyConnectionKey } from 'src/utilities/update-ably-connection-keys';
import { IconName } from '@ably/ui/core/Icon/types';
import SegmentedControl from '@ably/ui/core/SegmentedControl';
import dotGrid from './images/dot-grid.svg';

type ExamplesRendererProps = {
  example: ExampleWithContent;
  apiKey: string;
  activeLanguage: LanguageKey;
  setActiveLanguage: (language: LanguageKey) => void;
};

const determineSandpackTemplate = (language: LanguageKey) => {
  switch (language) {
    case 'javascript':
      return 'static';
    case 'react':
      return 'react-ts';
  }
};

const UserIndicator = ({ user }: { user: string }) => {
  return (
    <div className="absolute top-8 right-8 ui-text-code uppercase bg-neutral-200 dark:bg-neutral-1100 text-neutral-800 dark:text-neutral-500 z-10 px-8 py-4 font-bold rounded select-none">
      {user}
    </div>
  );
};

const ExamplesRenderer = ({ example, apiKey, activeLanguage, setActiveLanguage }: ExamplesRendererProps) => {
  const rewrittenFiles = useMemo<ExampleFiles>(() => {
    return Object.entries(example.files).reduce((acc, [languageKey, languageFiles]) => {
      return { ...acc, [languageKey]: updateAblyConnectionKey(languageFiles, apiKey) };
    }, {});
  }, [example.files, apiKey]);

  const languageFiles = rewrittenFiles[activeLanguage];

  return (
    <div className="bg-neutral-100 dark:bg-neutral-1200 p-16 rounded-2xl flex flex-col gap-16">
      <div className="flex gap-4">
        {Object.keys(rewrittenFiles).map((languageKey) => (
          <SegmentedControl
            key={languageKey}
            variant="subtle"
            active={activeLanguage === languageKey}
            rounded
            leftIcon={`icon-tech-${languageKey}` as IconName}
            onClick={() => setActiveLanguage(languageKey as LanguageKey)}
          >
            {languageKey.charAt(0).toUpperCase() + languageKey.slice(1)}
          </SegmentedControl>
        ))}
      </div>
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
            ...(activeLanguage === 'react' ? { react: '^18', 'react-dom': '^18', 'react-icons': '^5.4.0' } : {}),
          },
          devDependencies: {
            typescript: '^4.0.0',
          },
          environment: activeLanguage === 'react' ? 'create-react-app' : 'parcel',
        }}
        options={{
          visibleFiles: example.visibleFiles,
          autorun: true,
          autoReload: true,
          classes: {
            'sp-file-explorer': 'sm:!h-[400px]',
            'sp-editor': 'sm:!h-[400px]',
            'sp-preview': '!h-[233px]',
          },
        }}
        theme={githubLight}
        template={determineSandpackTemplate(activeLanguage as LanguageKey)}
        className="!flex flex-col md:flex-row gap-16 [&>div:first-child]:flex-1"
      >
        <CodeEditor
          theme="light"
          editor={{
            className: 'max-w-[400px] sm:max-w-[2000px]',
            showLineNumbers: true,
          }}
        />
        <div className="flex gap-16 flex-col sm:flex-row md:flex-col">
          <div className="relative bg-neutral-000 dark:bg-neutral-1300 flex-1">
            <SandpackPreview className="rounded-lg overflow-hidden" showOpenInCodeSandbox={false} showRefreshButton />
            <UserIndicator user="user 1" />
          </div>
          {example.layout === 'two-ui' && (
            <div className="relative bg-neutral-000 dark:bg-neutral-1300 flex-1">
              <SandpackPreview
                className="rounded-lg overflow-hidden"
                showOpenInCodeSandbox={false}
                startRoute="/?publisher=false"
              />
              <UserIndicator user="user 2" />
            </div>
          )}
          {example.layout === 'ui-console' && <SandpackConsole className="flex-1" />}
        </div>
      </SandpackProvider>
      <div
        style={{ backgroundImage: `url(${dotGrid})` }}
        className="absolute -z-10 top-[410px] left-0 w-full h-[360px] hidden sm:block"
      />
    </div>
  );
};

export default ExamplesRenderer;
