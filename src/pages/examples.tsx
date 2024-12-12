import React from 'react';
import Layout from '../../components/Layout';
import { Head } from '../components/Head';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

const ControlApi = () => {
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
        currentProduct="examples"
        collapsibleSidebar={false}
        noSidebar={true}
      ></Layout>
    </>
  );
};

export default ControlApi;
