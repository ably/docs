import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { CodeEditor, sandpackTheme } from 'src/components/CodeEditor';

import HowTo from 'HowTos/pub-sub/how-to.mdx';
import { graphql, useStaticQuery } from 'gatsby';
import { Head } from 'src/components/Head';
import Layout from 'src/components/Layout';
import PageTitle from 'src/components/PageTitle';
import { SidebarProvider } from 'src/contexts/SidebarContext';

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

  const files = {};
  data.files.nodes.forEach((fileNode) => {
    const { srcPath, content } = fileNode;
    files[srcPath] = content;
  });

  return (
    <>
      <Head title="Pub/Sub How To" description={meta_description} />

      <SidebarProvider initialCollapsedState={true}>
        <Layout showProductNavigation={true} currentProduct="spaces" collapsibleSidebar={true} isExtraWide>
          <article className="grid w-full grid-cols-2 mt-72 md:mt-0 md:pl-40 lg:pl-0">
            <div>
              <PageTitle>Pub/Sub How To</PageTitle>
              <div>
                <HowTo />
              </div>
            </div>
            <aside className="pt-24 pl-24">
              <SandpackProvider
                files={files}
                customSetup={{
                  dependencies: {
                    ably: 'latest',
                  },
                }}
                options={{
                  autorun: true,
                  autoReload: false,
                  externalResources: ['https://cdn.tailwindcss.com'],
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
                  <SandpackPreview style={{ height: '370px' }} />
                  <SandpackPreview style={{ height: '370px' }} />
                </div>
              </SandpackProvider>
            </aside>
          </article>
        </Layout>
      </SidebarProvider>
    </>
  );
};

export default PubSubHowTo;
