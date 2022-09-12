import * as React from 'react';
import { LATEST_ABLY_API_VERSION_STRING } from '../../data/transform/constants';
import Layout from '../components/Layout';

const IndexPage = () => {
  return (
    <>
      <Layout
        languages={[]}
        versionData={{
          version: LATEST_ABLY_API_VERSION_STRING,
          versions: [],
          rootVersion: LATEST_ABLY_API_VERSION_STRING,
        }}
      >
        <div className="w-full col-span-4 2xl:col-span-4" />
      </Layout>
    </>
  );
};

export default IndexPage;
