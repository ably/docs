import { CardProps } from '../../ProductPageContent';
import { Image } from '../../../Image';
import { Links } from './Links';
import { navigate } from '../../../Link';

export const QuickstartCard = ({ title, content, image, links }: CardProps) => (
  <div
    onClick={() => navigate(links?.[0]?.href || '#')}
    className="cursor-pointer p-24 border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col h-full justify-between hover:border-mid-grey hover:text-cool-black group"
  >
    <div className="flex items-center">
      {image && <Image image={image} alt={title} width="32px" />}
      <h2 className="ml-8 text-xl">{title}</h2>
    </div>
    <p className="text-lg text-dark-grey leading-6 mb-40 mt-12 w-3/5">{content}</p>
    {links && links.length >= 1 ? <Links links={links} /> : null}
  </div>
);
