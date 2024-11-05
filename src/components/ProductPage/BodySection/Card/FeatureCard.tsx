import { CardProps } from '../../ProductPageContent';
import { Links } from './Links';
import { Image } from '../../../Image';
import { navigate } from '../../../Link';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <div
    onClick={() => navigate(links?.[0]?.href || '#')}
    className="cursor-pointer border border-extra-light-grey rounded-lg bg-extra-light-grey flex sm:flex-col lg:flex-row hover:border-mid-grey hover:text-cool-black group"
  >
    <div className="p-24 flex">
      <div className="flex flex-col">
        <div>
          <h3 className="ui-text-h3">{title}</h3>
          <p className="ui-text-p2 text-neutral-800 mt-8 mb-40">{content}</p>
        </div>
        {links?.length ? <Links links={links} /> : null}
      </div>
    </div>
    {image && <Image image={image} className="max-w-[250px] mx-auto" />}
  </div>
);
