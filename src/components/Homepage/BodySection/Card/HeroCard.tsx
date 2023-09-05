import React from 'react';
import { CardProps } from '../../HomePageContent';
import { SvgObject } from '../../../SvgObject';
import { SearchBar } from '../../../Header/SearchBar';

export const HeroCard = ({ title, content, image }: CardProps) => (
  <div className="flex flex-col items-center mt-88">
    <SvgObject src={`/images/homepage/${image}`}></SvgObject>
    <div className="text-center" style={{ marginTop: '-90px' }}>
      <h1 className="ui-text-h1">{title}</h1>
      <p style={{ fontSize: '1.5rem' }} className="font-medium text-dark-grey mt-24">
        {content}
      </p>
    </div>
    <SearchBar
      displayLocation="homepage"
      extraStyleOptions={{
        wrapperContainer: { width: '100%', maxWidth: '500px', marginTop: '2rem' },
        inputContainer: { width: '100%', maxWidth: '500px' },
      }}
    />
  </div>
);
