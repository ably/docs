import { CardProps } from '../../ProductPageContent';
import { Links } from './Links';
import { Image } from '../../../Image';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <div className="border border-extra-light-grey rounded-lg bg-extra-light-grey flex justify-between hover:border-mid-grey hover:text-cool-black group">
    <div className="py-24 pl-24">
      <div className="flex flex-col h-full">
        <div>
          <h2 className="font-extrabold text-2xl">{title}</h2>
          <p className="text-base text-dark-grey mt-8 mb-40 leading-6 font-medium">{content}</p>
        </div>
        <Links links={links} />
      </div>
    </div>
    <Image image={image} />
  </div>
);
