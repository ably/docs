import { Link, withAssetPrefix } from 'gatsby';
import Icon from '@ably/ui/core/Icon';
import { useSiteMetadata } from '../../../hooks/use-site-metadata';
import { Head } from '../../../components/Head';
import { Loader } from '../../../components/Redoc';

const ChatRestApi = () => {
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/docs/api/chat-rest');
  const meta_title = 'Chat REST API';
  const meta_description = 'The Chat REST API enables you to interact with the Ably Chat endpoints via REST.';
  const chatRest = withAssetPrefix('/open-specs/chat.yaml');

  return (
    <>
      <Head title={meta_title} metaTitle={meta_title} canonical={canonical} description={meta_description} />
      <div className="ml-8 mt-32 mb-24">
        <div className="text-gui-default hover:text-gui-hover focus:text-gui-focus focus:outline-gui-focus group ui-text-p2">
          <Link to="/docs/chat">
            <Icon
              name="icon-gui-arrow-long-right-micro"
              size="1rem"
              additionalCSS="align-middle transform rotate-180 mr-4 h-16 w-16 ui-link"
            />
            Ably Chat
          </Link>
          <span className="ui-text-p2 ml-4"> / {meta_title}</span>
        </div>
      </div>
      <Loader specUrl={chatRest} />
    </>
  );
};

export default ChatRestApi;
