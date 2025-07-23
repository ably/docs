import React, { PropsWithChildren, useMemo } from 'react';
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
import { getRandomChannelName } from '../blocks/software/Code/get-random-channel-name';

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
    <div className="absolute top-2 right-2 ui-text-code uppercase bg-neutral-200 dark:bg-neutral-1100 text-neutral-800 dark:text-neutral-500 z-10 px-2 py-1 font-bold rounded select-none">
      {user}
    </div>
  );
};

const getDependencies = (id: string, products: string[], activeLanguage: LanguageKey) => {
  return {
    ably: '^2.9.0',
    nanoid: '^5.0.7',
    minifaker: '1.34.1',
    ...(products.includes('auth') ? { cors: '^2.8.5' } : {}),
    ...(products.includes('chat')
      ? { '@ably/chat': '^0.11.0', '@ably/chat-react-ui-components': '^0.1.0', clsx: '^2.1.1' }
      : {}),
    ...(products.includes('spaces') ? { '@ably/spaces': '^0.4.0' } : {}),
    ...(id === 'spaces-component-locking' ? { 'usehooks-ts': '^3.1.0' } : {}),
    ...(activeLanguage === 'react' || products.includes('chat') || products.includes('spaces')
      ? {
          react: '^18',
          'react-dom': '^18',
          'react-icons': '^5.4.0',
          'react-router-dom': '^6.22.2',
        }
      : {}),
    ...(id === 'pub-sub-history' && activeLanguage === 'react' ? { uikit: '^3.16.22' } : {}),
  };
};

const ExamplesRenderer = ({
  example,
  apiKey,
  activeLanguage,
  setActiveLanguage,
  children,
}: PropsWithChildren<ExamplesRendererProps>) => {
  const { id, files, visibleFiles, layout, products } = example;

  const rewrittenFiles = useMemo<ExampleFiles>(() => {
    const result: ExampleFiles = {};
    Object.entries(files).forEach(([languageKey, languageFiles]) => {
      result[languageKey as LanguageKey] = updateAblyConnectionKey(languageFiles, apiKey, {
        [languageKey]: getRandomChannelName(),
      });
    });
    return result;
  }, [files, apiKey]);

  const languageFiles = rewrittenFiles[activeLanguage];

  const isVerticalLayout = useMemo(() => layout === 'single-vertical' || layout === 'double-vertical', [layout]);
  const isDoubleLayout = useMemo(() => layout === 'double-horizontal' || layout === 'double-vertical', [layout]);
  const isLargeLayout = useMemo(() => layout === 'single-large', [layout]);
  const dependencies = useMemo(() => getDependencies(id, products, activeLanguage), [id, products, activeLanguage]);

  return (
    <SandpackProvider
      files={languageFiles}
      customSetup={{
        dependencies,
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
          'sp-file-explorer': cn(
            'sm:!w-[10.75rem] sm:min-w-[auto]',
            isVerticalLayout && 'sm:!h-[25rem]',
            isLargeLayout && 'sm:!h-[20rem]',
          ),
          'sp-editor': cn(isVerticalLayout && 'sm:!h-[25rem]', isLargeLayout && 'sm:!h-[20rem]'),
          'sp-preview': cn(
            '!h-80 w-full',
            isVerticalLayout && '!h-[21.875rem] md:!h-full md:!w-[21.875rem]',
            isLargeLayout && '!h-full w-full',
          ),
        },
        externalResources: [
          'https://cdn.tailwindcss.com',
          'https://unpkg.com/franken-ui@2.0.0/dist/css/core.min.css',
          ...(id === 'pub-sub-history'
            ? [
                'https://cdn.jsdelivr.net/npm/uikit@3.16.22/dist/js/uikit.min.js',
                'https://cdn.jsdelivr.net/npm/uikit@3.16.22/dist/js/uikit-icons.min.js',
              ]
            : []),
        ],
      }}
      theme={githubLight}
      template={determineSandpackTemplate(activeLanguage as LanguageKey)}
    >
      <div
        className={cn(
          'bg-neutral-100 dark:bg-neutral-1200 p-4 rounded-2xl flex flex-col gap-4',
          isLargeLayout && 'pb-8',
        )}
      >
        <div className="flex gap-1">
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
        <div
          className={cn(
            'flex flex-col gap-4 max-w-[calc(100vw-64px)]',
            isVerticalLayout && 'md:flex-row',
            isLargeLayout && 'md:flex-col',
          )}
        >
          <CodeEditor
            theme="light"
            editor={{
              className: '',
              showLineNumbers: true,
            }}
          />
          <div
            className={cn(
              'flex gap-4 flex-col sm:flex-row',
              isVerticalLayout && 'md:flex-col',
              isLargeLayout && 'md:flex-row md:justify-center md:h-fit md:min-h-[700px] min-h-[400px]',
            )}
          >
            <div className={cn('relative flex-1', isLargeLayout && 'md:max-w-6xl')}>
              <SandpackPreview
                className="rounded-lg overflow-hidden"
                showOpenInCodeSandbox={false}
                showRefreshButton
                {...(id === 'pub-sub-message-encryption' && { startRoute: '?encrypted=true' })}
              />
              <UserIndicator user={id === 'pub-sub-message-encryption' ? 'user 1 - encrypted' : 'user 1'} />
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
        <div
          style={{ backgroundImage: `url(${dotGrid})` }}
          className="absolute -z-10 top-[25.625rem] left-0 w-full h-[22.5rem] hidden sm:block"
        />
      </div>
      {children}
    </SandpackProvider>
  );
};

export default ExamplesRenderer;
