import React from 'react';
import { CardProps } from '../../ProductPageContent';
import { StaticImage } from '../../../StaticImage';
import { Links } from './Links';

export const TutorialCard = ({ title, image, links }: CardProps) => (
  <div className="p-24 border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col h-full justify-between block hover:border-mid-grey hover:text-cool-black group">
    <div className="flex mb-20">
      <StaticImage src={`/images/products/${image}`} alt={`${title}`} width="32px" />
      <h2 className="ml-8" style={{ fontSize: '1rem' }}>
        {title}
      </h2>
    </div>
    <Links links={links}></Links>
  </div>
);
