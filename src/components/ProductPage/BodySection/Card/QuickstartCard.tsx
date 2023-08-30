import React from 'react';
import { CardProps } from '../../ProductPageContent';
import { StaticImage } from '../../../StaticImage';
import { Links } from './Links';

export const QuickstartCard = ({ title, content, image, links }: CardProps) => (
  <div className="p-24 border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col h-full justify-between block hover:border-mid-grey hover:text-cool-black group">
    <div className="flex items-center">
      <StaticImage src={`/images/products/${image}`} alt={`${title}`} width="32px" />
      <h2 className="ml-8" style={{ fontSize: '1.25rem' }}>
        {title}
      </h2>
    </div>
    <p style={{ fontSize: '1rem', width: '60%' }} className="text-lg text-dark-grey mt-8 leading-6 mb-40 mt-12">
      {content}
    </p>

    <Links links={links}></Links>
  </div>
);
