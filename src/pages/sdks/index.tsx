import { withPrefix } from 'gatsby';
import SDKsContent from 'src/components/SDKsPage';
import Layout from 'src/components/Layout';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { Head } from 'src/components/Head';

const SDKsIndexPage = ({ location: { search } }: { location: { search: string } }) => {
  const title = 'SDKs';
  const meta_description = '';
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/sdks');

  const urlParams = new URLSearchParams(search);
  const tab = urlParams.get('tab') ?? '';

  return (
    <>
      <Head title={title} description={meta_description} canonical={canonical} />
      <Layout noSidebar currentProduct="SDKs">
        <SDKsContent tab={tab} />
      </Layout>
    </>
  );
};

export default SDKsIndexPage;
