import React, { useMemo } from 'react';
import { SandpackProvider, SandpackPreview } from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';
import { CodeEditor } from 'src/components/CodeEditor';
import { LanguageKey } from 'src/data/languages/types';
import { ExampleFiles, ExampleWithContent } from 'src/data/examples/types';
import { updateAblyConnectionKey } from 'src/utilities/update-ably-connection-keys';
import { IconName } from '@ably/ui/core/Icon/types';
import SegmentedControl from '@ably/ui/core/SegmentedControl';
import dotGrid from './images/dot-grid.svg';
import cn from '@ably/ui/core/utils/cn';

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
  const { id, files, visibleFiles, layout, products } = example;

  const rewrittenFiles = useMemo<ExampleFiles>(() => {
    return Object.entries(files).reduce((acc, [languageKey, languageFiles]) => {
      return { ...acc, [languageKey]: updateAblyConnectionKey(languageFiles, apiKey) };
    }, {});
  }, [files, apiKey]);

  const languageFiles = rewrittenFiles[activeLanguage];

  const isVerticalLayout = useMemo(() => layout === 'single-vertical' || layout === 'double-vertical', [layout]);
  const isDoubleLayout = useMemo(() => layout === 'double-horizontal' || layout === 'double-vertical', [layout]);

  const conditionalReactDeps =
    activeLanguage === 'react' || products.includes('chat') || products.includes('spaces')
      ? {
          react: '^18',
          'react-dom': '^18',
          'react-icons': '^5.4.0',
          'react-router-dom': '^6.22.2',
        }
      : {};

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
            ably: '^2.5.0',
            nanoid: '^5.0.7',
            minifaker: '1.34.1',
            ...(products.includes('auth') ? { cors: '^2.8.5' } : {}),
            ...(products.includes('chat') ? { '@ably/chat': '^0.5.0' } : {}),
            ...(products.includes('spaces') ? { '@ably/spaces': '^0.4.0' } : {}),
            ...(id === 'pub-sub-history' ? { uikit: '^3.7.0' } : {}),
            ...(id === 'spaces-component-locking' ? { 'usehooks-ts': '^3.1.0' } : {}),
            ...conditionalReactDeps,
          },
          devDependencies: {
            typescript: '^4.0.0',
          },
          environment: activeLanguage === 'react' ? 'create-react-app' : 'parcel',
        }}
        options={{
          visibleFiles,
          autorun: true,
          autoReload: true,
          classes: {
            /*
            For the calcs below:
            - 350px is the width of the preview (applicable to vertical layouts)
            - 64px is the padding subtotal within the container at smaller breakpoints
            - 176px is the padding subtotal within the container at larger breakpoints (vertical layouts)
            - 160px is the padding subtotal within the container at larger breakpoints (horizontal layouts)
            */
            'sp-layout': cn(
              'w-[calc(100vw-64px)]',
              isVerticalLayout
                ? 'md:w-[calc(100vw-64px-350px)] lg:w-[calc(100vw-176px-350px)] xl:w-[calc(1440px-176px-350px)]'
                : 'lg:w-[calc(100vw-160px)] xl:w-[calc(1440px-160px)]',
            ),
            'sp-file-explorer': cn('sm:!w-[172px] sm:min-w-[auto]', isVerticalLayout && 'sm:!h-[400px]'),
            'sp-editor': cn(isVerticalLayout && 'sm:!h-[400px]'),
            'sp-preview': cn('!h-[320px] w-full', isVerticalLayout && '!h-[350px] md:!h-full md:!w-[350px]'),
          },
          externalResources: [
            'https://cdn.tailwindcss.com',
            'https://unpkg.com/franken-ui@2.0.0/dist/css/core.min.css',
          ],
        }}
        theme={githubLight}
        template={determineSandpackTemplate(activeLanguage as LanguageKey)}
      >
        <div className={cn('flex flex-col gap-16 max-w-[calc(100vw-64px)]', isVerticalLayout && 'md:flex-row')}>
          <CodeEditor
            theme="light"
            editor={{
              className: '',
              showLineNumbers: true,
            }}
          />
          <div className={cn('flex gap-16 flex-col sm:flex-row', isVerticalLayout && 'md:flex-col')}>
            <div className="relative flex-1">
              <SandpackPreview className="rounded-lg overflow-hidden" showOpenInCodeSandbox={false} showRefreshButton />
              <UserIndicator user="user 1" />
            </div>
            {isDoubleLayout && (
              <div className="relative flex-1">
                <SandpackPreview
                  className="rounded-lg overflow-hidden"
                  showOpenInCodeSandbox={false}
                  startRoute="/?publisher=false"
                />
                <UserIndicator user="user 2" />
              </div>
            )}
          </div>
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
