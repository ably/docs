import React from 'react';
import { CardProps } from '../../ProductPageContent';
import { StaticImage } from '../../../StaticImage';
import Link from '../../../Link';

export const ExampleCard = ({ title, image, link, external }: CardProps) => (
  <Link
    to={link}
    external={external}
    className="items-center border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col h-full hover:border-mid-grey hover:text-cool-black group"
  >
    <StaticImage src={`/images/products/${image}`} style={{ pointerEvents: 'none' }}></StaticImage>
    <p className="pb-24 ml-8" style={{ fontSize: '1rem' }}>
      {title}
    </p>
  </Link>
);
