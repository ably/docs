import React from 'react';
import { CardProps } from '../../ProductPageContent';
import { SvgObject } from '../../../SvgObject';
import Link from '../../../Link';

export const ExampleCard = ({ title, image, link }: CardProps) => (
  <Link
    to={link}
    className="items-center border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col h-full block hover:border-mid-grey hover:text-cool-black group"
  >
    <SvgObject src={`/images/products/${image}`} style={{ pointerEvents: 'none' }}></SvgObject>
    <p className="pb-24 ml-8" style={{ fontSize: '1rem' }}>
      {title}
    </p>
  </Link>
);
