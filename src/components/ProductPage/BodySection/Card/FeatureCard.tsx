import React from 'react';
import { CardProps } from '../../ProductPageContent';
import { Links } from './Links';
import { Image } from '../../../Image';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <div className="border border-extra-light-grey rounded-lg bg-extra-light-grey flex justify-between block hover:border-mid-grey hover:text-cool-black group">
    <div className="py-24 pl-24">
      <div className="flex flex-col h-full">
        <div>
          <h2 style={{ fontSize: '1.5rem' }}>{title}</h2>
          <p style={{ fontSize: '1rem' }} className="text-lg text-dark-grey mt-8 mb-40 leading-6">
            {content}
          </p>
        </div>
        <Links links={links}></Links>
      </div>
    </div>
    <Image image={image}></Image>
  </div>
);
