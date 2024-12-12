import React from 'react';
import { Head } from '../components/Head';
import Layout from '../components/Layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import ExamplesContent from '../components/Examples/ExamplesContent';

const Examples = () => {
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/examples');
  const meta_title = 'Examples';
  const meta_description = 'Examples';
  return (
    <>
      <Head title={meta_title} metaTitle={meta_title} canonical={canonical} description={meta_description} />
      <Layout
        isExtraWide
        showProductNavigation={false}
        currentProduct="api-reference"
        collapsibleSidebar={false}
        noSidebar={true}
      >
        <ExamplesContent />
      </Layout>
    </>
  );
};

export default Examples;
