import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { SandpackProvider, SandpackPreview } from '@codesandbox/sandpack-react';
import { Head } from 'src/components/Head';
import Layout from 'src/components/Layout';
import PageTitle from 'src/components/PageTitle';
import HowTo from 'HowTos/pub-sub/how-to.mdx';
import { CodeEditor, sandpackTheme } from 'src/components/CodeEditor';

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
      <Layout showProductNavigation={true} currentProduct="spaces" isExtraWide>
        <article className="mt-72 md:mt-0 w-full md:pl-40 lg:pl-0 grid grid-cols-2">
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
                entry: '/index.js',
              }}
              options={{
                autorun: true,
                autoReload: false,
              }}
              theme={sandpackTheme}
            >
              <CodeEditor
                editor={{
                  showLineNumbers: true,
                }}
              />

              <div className="my-16 flex gap-16">
                <SandpackPreview style={{ height: '370px' }} />
                <SandpackPreview style={{ height: '370px' }} />
              </div>
            </SandpackProvider>
          </aside>
        </article>
      </Layout>
    </>
  );
};

export default PubSubHowTo;
