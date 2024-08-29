import { CardProps } from '../../ProductPageContent';
import { Links } from './Links';
import { Image } from '../../../Image';
import { navigate } from '../../../Link';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <div
    onClick={() => navigate(links?.[0]?.href || '#')}
    className="cursor-pointer border border-extra-light-grey rounded-lg bg-extra-light-grey flex justify-between hover:border-mid-grey hover:text-cool-black group"
  >
    <div className="py-24 pl-24">
      <div className="flex flex-col h-full">
        <div>
          <h2 className="text-p2">{title}</h2>
          <p className="text-p2 text-dark-grey mt-8 mb-40 leading-6">{content}</p>
        </div>
        {links?.length ? <Links links={links} /> : null}
      </div>
    </div>
    {image && <Image image={image} />}
  </div>
);
