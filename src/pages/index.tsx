import * as React from 'react';
import { LATEST_ABLY_API_VERSION_STRING } from '../../data/transform/constants';
import Layout from '../components/Layout';
import { LeftSideBar } from '../components/StaticQuerySidebar';

const IndexPage = () => {
  return (
    <Layout
      languages={[]}
      versionData={{
        version: LATEST_ABLY_API_VERSION_STRING,
        versions: [],
        rootVersion: LATEST_ABLY_API_VERSION_STRING,
      }}
    >
      <LeftSideBar />
    </Layout>
  );
};

export default IndexPage;
