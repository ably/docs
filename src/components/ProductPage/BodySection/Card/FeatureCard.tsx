import { CardProps } from '../../ProductPageContent';
import { Links } from './Links';
import { Image } from '../../../Image';
import { navigate } from '../../../Link';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <div
    onClick={() => navigate(links?.[0]?.href || '#')}
    className="cursor-pointer border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col lg:flex-row hover:border-mid-grey hover:text-cool-black group p-24 gap-24"
  >
    <div className="flex flex-col flex-1 gap-16 lg:gap-40">
      <div className="flex flex-col gap-8 flex-1">
        <h3 className="ui-text-h3">{title}</h3>
        <p className="ui-text-p2 text-neutral-800">{content}</p>
      </div>
      {links?.length ? <Links links={links} /> : null}
    </div>
    <div className="flex items-center justify-center">{image ? <Image image={image} className="h-128" /> : null} </div>
  </div>
);
