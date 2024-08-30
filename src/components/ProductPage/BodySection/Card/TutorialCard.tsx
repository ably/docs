import { CardProps } from '../../ProductPageContent';
import { Image } from '../../../Image';
import { Links } from './Links';
import { navigate } from '../../../Link';

export const TutorialCard = ({ title, image, links }: CardProps) => (
  <div
    onClick={() => navigate(links?.[0]?.href || '#')}
    className="cursor-pointer p-24 border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col h-full justify-between hover:border-mid-grey hover:text-cool-black group"
  >
    <div className="flex mb-20">
      {image && <Image image={image} alt={title} width="32px" />}
      <h2 className="ml-8 text-base">{title}</h2>
    </div>
    {links?.length ? <Links links={links} /> : null}
  </div>
);
