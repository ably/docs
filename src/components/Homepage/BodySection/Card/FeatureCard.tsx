import { CardProps } from '../../HomepageContent';
import { Links } from '../../../ProductPage/BodySection/Card';
import { Image } from '../../../Image';
import { navigate } from '../../../Link';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <button
    onClick={() => navigate(links?.[0]?.href || '#')}
    className="flex justify-between flex-col w-full text-left hover:bg-neutral-50 transition-colors focus:outline-none"
    role="link"
  >
    {image && <Image image={image} />}
    <h3 className="ui-text-h3 mt-24">{title}</h3>
    <p className="mt-8 mb-24 mr-8 leading-6 ui-text-p1 text-neutral-800">{content}</p>
    {links?.length ? <Links links={links} /> : null}
  </button>
);
