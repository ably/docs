import Layout from 'src/components/Layout';
import SDKsContent from 'src/components/SDKsPage';
import { Head } from 'src/components/Head';

const SDKsIndexPage = ({ location: { search } }: { location: { search: string } }) => {
  const meta_title = 'SDKs';
  const meta_description = 'Placeholder';

  const urlParams = new URLSearchParams(search);
  const tab = urlParams.get('tab') ?? '';

  return (
    <>
      <Head title={meta_title} canonical="/${DOCUMENTATION_NAME}/sdks" description={meta_description} />
      <Layout noSidebar currentProduct="SDKs">
        <SDKsContent tab={tab} />
      </Layout>
    </>
  );
};

export default SDKsIndexPage;
