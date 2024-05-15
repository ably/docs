import { CardProps } from '../../HomepageContent';
import { Links } from '../../../ProductPage/BodySection/Card';
import { Image } from '../../../Image';
import { navigate } from '../../../Link';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <div onClick={() => navigate(links?.[0]?.href || '#')} className="flex justify-between flex-col">
    {image && <Image image={image} />}
    <h2 className="mt-24 font-extrabold text-2xl">{title}</h2>
    <p className="text-dark-grey mt-8 mb-24 mr-8 leading-6 font-medium text-base">{content}</p>
    {links?.length ? <Links links={links} /> : null}
  </div>
);
