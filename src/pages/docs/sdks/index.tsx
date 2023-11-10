import { DOCUMENTATION_NAME } from '../../../../data/transform/constants';
import SDKsContent from 'src/components/SDKsPage';
import Layout from 'src/components/Layout';
import { Head } from 'src/components/Head';

const SDKsIndexPage = ({ location: { search } }: { location: { search: string } }) => {
  const meta_title = 'SDKs';
  const meta_description = 'Placeholder';

  const urlParams = new URLSearchParams(search);
  const tab = urlParams.get('tab') ?? '';

  return (
    <>
      <Head title={meta_title} description={meta_description} canonical={`/${DOCUMENTATION_NAME}/sdks`} />
      <Layout noSidebar currentProduct="SDKs">
        <SDKsContent tab={tab} />
      </Layout>
    </>
  );
};

export default SDKsIndexPage;
