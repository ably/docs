import { useSiteMetadata } from '../../hooks/use-site-metadata';
import Layout from '../../components/Layout';
import { Head } from '../../components/Head';
import { Loader } from '../../components/Redoc';
import { Link, withPrefix } from 'gatsby';
import Icon from '@ably/ui/core/Icon';
import React from 'react';

const ControlApi = () => {
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/api/control-api');
  const meta_title = 'Control API';
  const meta_description =
    'The Control API is a REST API that enables you to manage your Ably account programmatically. This is the Control API Reference guide.';
  const controlAPI = withPrefix('/open-specs/control-v1.yaml');

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
        <div className="ml-8 mt-40 mb-24">
          <div className="text-gui-default hover:text-gui-hover focus:text-gui-focus focus:outline-gui-focus group ui-text-p2">
            <Link to="/api">
              <Icon
                name="icon-gui-chevron-left-micro"
                size="1rem"
                additionalCSS="align-middle mr-4 h-16 w-16 ui-link"
              />
              API Reference
            </Link>
            <span className="ui-text-p2 ml-4"> / {meta_title}</span>
          </div>
        </div>
        <Loader specUrl={controlAPI} />
      </Layout>
    </>
  );
};

export default ControlApi;
