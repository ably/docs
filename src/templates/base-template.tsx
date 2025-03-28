import { Script, ScriptStrategy } from 'gatsby';
import { useLayoutEffect, useMemo } from 'react';

import { Head } from 'src/components/Head';
import Article from 'src/components/Article';
import PageTitle from 'src/components/PageTitle';
import Html from 'src/components/blocks/Html';
import { PathnameContext } from 'src/contexts';
import { AblyDocument, AblyDocumentMeta, AblyTemplateData, ProductName } from './template-data';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { getMetaTitle } from 'src/components/common/meta-title';
import { useLayoutContext } from 'src/contexts/layout-context';
import { LanguageKey } from 'src/data/languages/types';

const getMetaDataDetails = (
  document: AblyDocument,
  prop: keyof AblyDocumentMeta,
  alternative: string | string[] = '',
) => (document?.meta?.[prop] ? document.meta[prop] : alternative);

const META_DESCRIPTION_FALLBACK = `Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime. Organizations like Toyota, Bloomberg, HubSpot, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale.`;
const META_PRODUCT_FALLBACK = 'pub_sub';

interface ITemplate extends AblyTemplateData {
  showProductNavigation: boolean;
}

const Template = ({
  location: { pathname },
  pageContext: { contentOrderedList, slug, script },
  data: { document: ablyDocument },
  currentProduct,
}: ITemplate) => {
  const { setLanguages } = useLayoutContext();

  useLayoutEffect(() => {
    const languagesSet = new Set<LanguageKey>();

    document.querySelectorAll('.docs-language-navigation').forEach((element) => {
      const languages = element.getAttribute('data-languages');
      if (languages) {
        languages.split(',').forEach((language) => languagesSet.add(language as LanguageKey));
      }
    });

    setLanguages(Array.from(languagesSet));
  }, [setLanguages]);

  const title = getMetaDataDetails(ablyDocument, 'title') as string;
  const description = getMetaDataDetails(ablyDocument, 'meta_description', META_DESCRIPTION_FALLBACK) as string;
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl(`/docs/${slug}`);

  // when we don't get a product, peek into the metadata of the page for a default value
  currentProduct ??= getMetaDataDetails(ablyDocument, 'product', META_PRODUCT_FALLBACK) as ProductName;
  const metaTitle = getMetaTitle(title, currentProduct) as string;

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
      <PathnameContext.Provider value={pathname}>
        <Head title={title} metaTitle={metaTitle} canonical={canonical} description={description} />
        <Article>
          <PageTitle>{title}</PageTitle>
          <div>{elements}</div>
        </Article>
      </PathnameContext.Provider>
      {script && <Script src={`/scripts/${slug}.js`} strategy={ScriptStrategy.idle} />}
    </>
  );
};

export default Template;
