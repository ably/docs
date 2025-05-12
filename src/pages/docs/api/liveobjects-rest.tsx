import { Link, withAssetPrefix } from 'gatsby';
import Icon from '@ably/ui/core/Icon';
import { useSiteMetadata } from '../../../hooks/use-site-metadata';
import { Head } from '../../../components/Head';
import { Loader } from '../../../components/Redoc';

const LiveObjectsRestApi = () => {
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/docs/api/liveobjects-rest');
  const meta_title = 'LiveObjects REST API';
  const meta_description = 'Ably provides the raw REST API for interacting with the LiveObjects stored on a channel.';
  const liveObjectsRest = withAssetPrefix('/open-specs/liveobjects.yaml');

  return (
    <>
      <Head title={meta_title} metaTitle={meta_title} canonical={canonical} description={meta_description} />
      <div className="ml-8 mt-32 mb-24">
        <div className="text-gui-default hover:text-gui-hover focus:text-gui-focus focus:outline-gui-focus group ui-text-p2">
          <Link to="/docs/liveobjects">
            <Icon
              name="icon-gui-arrow-long-right-micro"
              size="1rem"
              additionalCSS="align-middle transform rotate-180 mr-4 h-16 w-16 ui-link"
            />
            Ably LiveObjects
          </Link>
          <span className="ui-text-p2 ml-4"> / {meta_title}</span>
        </div>
      </div>
      <Loader specUrl={liveObjectsRest} />
    </>
  );
};

export default LiveObjectsRestApi;
