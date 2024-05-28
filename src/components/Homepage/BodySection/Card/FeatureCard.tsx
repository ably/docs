import { CardProps } from '../../HomepageContent';
import { Links } from '../../../ProductPage/BodySection/Card/Links';
import { Image } from '../../../Image';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <div className="flex justify-between flex-col">
    <Image image={image} />
    <h2 style={{ fontSize: '1.5rem' }} className="mt-24 font-extrabold">
      {title}
    </h2>
    <p style={{ fontSize: '1.125rem' }} className="text-dark-grey mt-8 mb-24 mr-8 leading-6 font-medium">
      {content}
    </p>
    <Links links={links} />
  </div>
);
