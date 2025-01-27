import SDKsContent from 'src/components/SDKsPage';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { Head } from 'src/components/Head';
import { useSetLayoutOptions } from 'src/hooks/use-set-layout-options';

const SDKsIndexPage = ({ location: { search } }: { location: { search: string } }) => {
  useSetLayoutOptions({ noSidebar: true, hideSearchBar: false });

  const title = 'SDKs';
  const meta_description = '';
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/sdks');

  const urlParams = new URLSearchParams(search);
  const tab = urlParams.get('tab') ?? '';

  return (
    <>
      <Head title={title} description={meta_description} canonical={canonical} />
      <SDKsContent tab={tab} />
    </>
  );
};

export default SDKsIndexPage;
