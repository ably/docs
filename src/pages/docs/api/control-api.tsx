import { Link, withAssetPrefix } from 'gatsby';
import { useSiteMetadata } from '../../../hooks/use-site-metadata';
import { Head } from '../../../components/Head';
import { Loader } from '../../../components/Redoc';
import { ArrowLongRightIcon } from '@heroicons/react/16/solid';

const ControlApi = () => {
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/docs/api/control-api');
  const meta_title = 'Control API';
  const meta_description =
    'The Control API is a REST API that enables you to manage your Ably account programmatically. This is the Control API Reference guide.';
  const controlAPI = withAssetPrefix('/open-specs/control-v1.yaml');

  return (
    <>
      <Head title={meta_title} metaTitle={meta_title} canonical={canonical} description={meta_description} />
      <div className="ml-2 mt-8 mb-6">
        <div className="text-gui-default hover:text-gui-hover dark:text-gui-default-dark dark:hover:text-gui-hover-dark focus:text-gui-focus focus:outline-gui-focus group ui-text-p2">
          <Link to="/docs/api">
            <ArrowLongRightIcon
              className="size-[1rem] align-middle transform rotate-180 mr-1 h-4 w-4 ui-link"
              aria-hidden
            />
            API Reference
          </Link>
          <span className="ui-text-p2 ml-1"> / {meta_title}</span>
        </div>
      </div>
      <Loader specUrl={controlAPI} />
    </>
  );
};

export default ControlApi;
