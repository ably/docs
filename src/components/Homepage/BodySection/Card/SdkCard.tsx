import React from 'react';
import { CardProps } from '../../ProductPageContent';
import { StaticImage } from '../../../StaticImage';

const sdkLanguageStyle = {
  fontFamily: 'Jetbrains mono',
  fontWeight: '500',
  color: 'var(--color-charcoal-grey)',
  fontSize: 'var(--fs-p3)',
  lineHeight: 'var(--lh-relaxed)',
};

export const SdkCard = ({ title, image }: CardProps) => (
  <div className="items-center border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col h-full p-16 pb-0">
    <p className="mr-auto pb-16" style={sdkLanguageStyle}>
      {title}
    </p>
    <StaticImage src={`/images/homepage/${image}`}></StaticImage>
  </div>
);
