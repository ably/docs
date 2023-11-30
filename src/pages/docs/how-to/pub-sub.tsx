import React, { useMemo, useState } from 'react';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { CodeEditor, sandpackTheme } from 'src/components/CodeEditor';

import HowTo from 'HowTos/pub-sub/how-to.mdx';
import { graphql, useStaticQuery } from 'gatsby';
import { Head } from 'src/components/Head';
import Layout from 'src/components/Layout';
import { MarkdownProvider } from 'src/components/Markdown';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import UserContext, { UserApiKey } from 'src/contexts/user-context';
import { DOCUMENTATION_NAME } from '../../../../data/transform/constants';
import { useContext } from 'react';
import { getRandomChannelName } from 'src/components/blocks/software/Code/get-random-channel-name';

const getApiKey = (userApiKeys: UserApiKey[]) => {
  const app = userApiKeys[0];
  if (!app) {
    return 'Waiting...';
  }

  return app.apiKeys[0].whole_key;
};

const ablyEnvironment = process.env.GATSBY_ABLY_ENVIRONMENT ?? 'production';
const basketballChannelName = getRandomChannelName();
const footballChannelName = getRandomChannelName();

const updateAblyConnectionKey = (files: Record<string, string>, userApiKeys: UserApiKey[]) => {
  const names = Object.keys(files);
  const apiKey = getApiKey(userApiKeys);

  return names.reduce((acc, name: string) => {
    let content = files[name];

    // Environment
    if (ablyEnvironment !== 'production') {
      content = content.replaceAll(/new Ably\.(Realtime|Rest)\.Promise\(\{/g, (_match, type) => {
        return `new Ably.${type}.Promise({\n  environment: '${ablyEnvironment}',`;
      });
    }

    // API Key
    content = content.replaceAll('import.meta.env.VITE_ABLY_KEY', `"${apiKey}"`);

    // Channel names
    content = content.replaceAll('import.meta.env.VITE_BASKETBALL_CHANNEL_NAME', `"${basketballChannelName}"`);
    content = content.replaceAll('import.meta.env.VITE_FOOTBALL_CHANNEL_NAME', `"${footballChannelName}"`);

    return { ...acc, [name]: content };
  }, {});
};

const chooseFileVersions = (isSolved: boolean, files: Record<string, string>) => {
  const names = Object.keys(files);
  const solved = names.filter((name) => name.endsWith('.complete.js'));
  const unsolved = solved.map((name) => name.replace('.complete', ''));
  const candidates = solved.concat(unsolved);

  return names.reduce((acc, name: string) => {
    const content = files[name];
    if (candidates.includes(name)) {
      if (isSolved) {
        if (name.endsWith('.complete.js')) {
          const newName = name.replace('.complete', '');
          return { ...acc, [newName]: content };
        } else {
          return acc;
        }
      }
    }
    return { ...acc, [name]: content };
  }, {});
};

interface HowToFile {
  srcPath: string;
  content: string;
}

const PubSubHowTo = () => {
  const meta_description = `How to use basic publish and subscribe (pub/sub) functionality with Ably channels.`;

  const data = useStaticQuery(graphql`
    query {
      files: allHowToSourceFile(filter: { howToName: { eq: "pub-sub" } }) {
        nodes {
          srcPath
          content
        }
      }
    }
  `);

  const [solved, setSolved] = useState(false);

  const files = useMemo(() => {
    return data.files.nodes.reduce((acc: object, file: HowToFile) => {
      const { srcPath, content } = file;
      return { ...acc, [srcPath]: content };
    }, {});
  }, [data]);

  const visibleFiles = [
    '/App.tsx',
    '/index.tsx',
    '/components/Scoreboard.tsx',
    '/basketballGame.js',
    '/basketballPublisher.js',
    '/basketballSubscriber.js',
    '/footballGame.js',
    '/footballPublisher.js',
    '/footballSubscriber.js',
  ];

  const userData = useContext(UserContext);
  const apiKeys = userData.apiKeys.data;
  const hasApiKeys = apiKeys.length > 0;
  const rewrittenFiles = useMemo(() => {
    return updateAblyConnectionKey(files, apiKeys);
  }, [files, apiKeys]);
  const runnableFiles = chooseFileVersions(solved, rewrittenFiles);

  return (
    <>
      <Head title="Pub/Sub How To" canonical={`/${DOCUMENTATION_NAME}/how-to/pub-sub`} description={meta_description} />

      <SidebarProvider initialCollapsedState={true}>
        <Layout showProductNavigation={true} currentProduct="channels" collapsibleSidebar={true} isExtraWide>
          <article className="grid w-full grid-cols-1 md:grid-cols-2 mt-56 md:mt-0 md:pl-24">
            <div className="max-w-md md:pr-24 md:border-r border-mid-grey">
              <MarkdownProvider>
                <HowTo
                  showSolution={() => {
                    setSolved(true);
                  }}
                />
              </MarkdownProvider>
            </div>
            <aside className="pt-48 md:pl-24 relative">
              {/* 160px = 48px for aside top padding, 48px for nav bar and 64px for top header */}
              <div
                className="sticky w-full pb-24 overflow-scroll"
                style={{ top: '160px', height: 'calc(100vh - 160px)' }}
              >
                {hasApiKeys ? (
                  <>
                    <SandpackProvider
                      files={runnableFiles}
                      customSetup={{
                        dependencies: {
                          ably: 'latest',
                        },
                      }}
                      options={{
                        visibleFiles: visibleFiles,
                        autorun: true,
                        autoReload: true,
                      }}
                      theme={sandpackTheme}
                      template="react-ts"
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
                  </>
                ) : (
                  <b>Loading...</b>
                )}
              </div>
            </aside>
          </article>
        </Layout>
      </SidebarProvider>
    </>
  );
};

export default PubSubHowTo;
