import React from 'react';
import { CardProps } from '../../HomepagePageContent';
import { Links } from '../../../ProductPage/BodySection/Card/Links';
import { SvgObject } from '../../../SvgObject';

export const FeatureCard = ({ title, content, image, links }: CardProps) => (
  <div className="flex justify-between flex-col">
    <SvgObject src={`/images/homepage/${image}`}></SvgObject>
    <h2 style={{ fontSize: '1.5rem' }} className="mt-24 font-medium">
      {title}
    </h2>
    <p style={{ fontSize: '1.125rem' }} className="text-dark-grey mt-8 mb-24 mr-8 leading-6">
      {content}
    </p>
    <Links links={links}></Links>
  </div>
);
