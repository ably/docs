import { Link, withAssetPrefix } from 'gatsby';
import Icon from '@ably/ui/core/Icon';
import { useSiteMetadata } from '../../../hooks/use-site-metadata';
import { Head } from '../../../components/Head';
import { Loader } from '../../../components/Redoc';

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
        <div className="text-gui-default hover:text-gui-hover focus:text-gui-focus focus:outline-gui-focus group ui-text-p2">
          <Link to="/docs/api">
            <Icon
              name="icon-gui-arrow-long-right-micro"
              size="1rem"
              additionalCSS="align-middle transform rotate-180 mr-1 h-4 w-4 ui-link"
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
