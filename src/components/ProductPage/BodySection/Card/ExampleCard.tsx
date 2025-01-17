import { CardProps } from '../../ProductPageContent';
import { Image } from '../../../Image';
import Link from '../../../Link';

export const ExampleCard = ({ title, image, link, external }: CardProps) => (
  <Link
    to={link}
    external={external}
    className="items-center border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col h-full hover:border-mid-grey hover:text-cool-black group"
  >
    <Image image={image} className="pointer-events-none" />
    <h4 className="ui-text-h4 pb-24 ml-8 text-center">{title}</h4>
  </Link>
);
