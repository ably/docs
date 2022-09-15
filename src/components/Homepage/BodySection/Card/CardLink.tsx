import React from 'react';
import { StaticImage } from 'src/components/StaticImage';

export const CardLink = ({ link, callToAction }: { link: string; callToAction: string }) => (
  <>
    <a className="text-gui-default font-medium align-middle" href={link}>
      {callToAction}
    </a>
    <StaticImage className="w-20 h-20 ml-4 text-sm align-middle" src="/images/icons/arrow-right.svg" />
  </>
);
