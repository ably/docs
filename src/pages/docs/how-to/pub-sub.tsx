import { SandpackPreview, SandpackProvider, SandpackConsole } from '@codesandbox/sandpack-react';
import React, { useMemo, useState } from 'react';
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
  const meta_description = `A fine interactve how to`;

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
          <article className="grid w-full grid-cols-2 mt-72 md:mt-0 md:px-32">
            <div>
              <MarkdownProvider>
                <HowTo
                  showSolution={() => {
                    setSolved(true);
                  }}
                />
              </MarkdownProvider>
            </div>
            <aside className="pt-24 pl-24">
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
                      autoReload: false,
                    }}
                    theme={sandpackTheme}
                    template="react-ts"
                  >
                    <CodeEditor
                      editor={{
                        showLineNumbers: true,
                      }}
                    />

                    <div className="flex gap-16 my-16">
                      <SandpackPreview style={{ height: '480px' }} />
                      <SandpackPreview style={{ height: '480px' }} />
                    </div>

                    <SandpackConsole />
                  </SandpackProvider>
                </>
              ) : (
                <b>Loading...</b>
              )}
            </aside>
          </article>
        </Layout>
      </SidebarProvider>
    </>
  );
};

export default PubSubHowTo;
