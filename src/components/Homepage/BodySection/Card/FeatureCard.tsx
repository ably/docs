import { CardProps } from '../../HomepageContent';
import { Links } from '../../../ProductPage/BodySection/Card/Links';
import { Image } from '../../../Image';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <div className="flex justify-between flex-col">
    <Image image={image} />
    <h2 className="mt-24 font-extrabold text-2xl">{title}</h2>
    <p className="text-dark-grey mt-8 mb-24 mr-8 leading-6 font-medium text-base">{content}</p>
    <Links links={links} />
  </div>
);
