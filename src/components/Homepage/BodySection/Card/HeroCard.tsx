import React from 'react';
import { CardProps } from '../../ProductPageContent';
import { SvgObject } from '../../../SvgObject';

export const HeroCard = ({ title, content, image }: CardProps) => (
  <div className="flex flex-col items-center mt-88">
    <SvgObject src={`/images/homepage/${image}`}></SvgObject>
    <div className="text-center" style={{ marginTop: '-90px' }}>
      <h1 className="ui-text-h1">{title}</h1>
      <p style={{ fontSize: '1.5rem' }} className="font-medium text-dark-grey mt-24">
        {content}
      </p>
    </div>
  </div>
);
