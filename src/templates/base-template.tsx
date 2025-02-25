import { Script, ScriptStrategy } from 'gatsby';
import { useMemo } from 'react';

import { Head } from 'src/components/Head';
import Article from 'src/components/Article';
import PageTitle from 'src/components/PageTitle';
import Html from 'src/components/blocks/Html';

import { AblyDocument, AblyDocumentMeta, AblyTemplateData } from './template-data';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { getMetaTitle } from 'src/components/common/meta-title';

const getMetaDataDetails = (
  document: AblyDocument,
  prop: keyof AblyDocumentMeta,
  alternative: string | string[] = '',
) => (document?.meta?.[prop] ? document.meta[prop] : alternative);

const META_DESCRIPTION_FALLBACK = `Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime. Organizations like Toyota, Bloomberg, HubSpot, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale.`;

interface ITemplate extends AblyTemplateData {
  showProductNavigation: boolean;
}

const Template = ({ pageContext: { contentOrderedList, slug, script }, data: { document } }: ITemplate) => {
  const title = getMetaDataDetails(document, 'title') as string;
  const description = getMetaDataDetails(document, 'meta_description', META_DESCRIPTION_FALLBACK) as string;
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl(slug);
  const metaTitle = getMetaTitle(title, 'chat') as string;

  const elements = useMemo(
    () =>
      contentOrderedList.map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html data={data} key={i} />,
      ),
    [contentOrderedList],
  );

  return (
    <>
      <Head title={title} metaTitle={metaTitle} canonical={canonical} description={description} />
      <Article>
        <PageTitle>{title}</PageTitle>
        <div>{elements}</div>
      </Article>
      {script && <Script src={`/scripts/${slug}.js`} strategy={ScriptStrategy.idle} />}
    </>
  );
};

const TemplateWrapper = (props: ITemplate) => {
  return <Template {...props} />;
};

export default TemplateWrapper;
