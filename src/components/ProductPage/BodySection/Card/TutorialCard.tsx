import { CardProps } from '../../ProductPageContent';
import { Image } from '../../../Image';
import { Links } from './Links';

export const TutorialCard = ({ title, image, links }: CardProps) => (
  <div className="p-24 border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col h-full justify-between hover:border-mid-grey hover:text-cool-black group">
    <div className="flex mb-20">
      <Image image={image} alt={title} width="32px" />
      <h2 className="ml-8 font-extrabold" style={{ fontSize: '1rem' }}>
        {title}
      </h2>
    </div>
    <Links links={links}></Links>
  </div>
);
