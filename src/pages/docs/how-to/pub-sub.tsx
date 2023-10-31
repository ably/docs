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

const ablyEnvironment = process.env.GATSBY_ABLY_ENVIRONMENT;
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

  const files = data.files.nodes.reduce((acc: object, file: HowToFile) => {
    const { srcPath, content } = file;
    return { ...acc, [srcPath]: content };
  }, {});

  const userData = useContext(UserContext);
  const apiKeys = userData.apiKeys.data;
  const hasApiKeys = apiKeys.length > 0;

  return (
    <>
      <Head title="Pub/Sub How To" canonical={`/${DOCUMENTATION_NAME}/how-to/pub-sub`} description={meta_description} />

      <SidebarProvider initialCollapsedState={true}>
        <Layout showProductNavigation={true} currentProduct="channels" collapsibleSidebar={true} isExtraWide>
          <article className="grid w-full grid-cols-2 mt-72 md:mt-0 md:px-32">
            <div>
              <PageTitle>Pub/Sub How To</PageTitle>
              <div>
                <HowTo />
              </div>
            </div>
            <aside className="pt-24 pl-24">
              {hasApiKeys ? (
                <SandpackProvider
                  files={updateAblyConnectionKey(files, apiKeys)}
                  customSetup={{
                    dependencies: {
                      ably: 'latest',
                    },
                  }}
                  options={{
                    visibleFiles: ['/App.tsx', '/index.css', '/index.tsx', '/components/Scoreboard.tsx'],
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
                    <SandpackPreview style={{ height: '420px' }} />
                    <SandpackPreview style={{ height: '420px' }} />
                  </div>
                </SandpackProvider>
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
