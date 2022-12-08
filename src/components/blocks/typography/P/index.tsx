import React from 'react';
import { HtmlComponentProps } from '../../../html-component-props';
import { Tip } from './Tip';
import { attribsContainClass } from '../../../../clientside-data-utilities';
import Html from '../../Html';

const Paragraph = ({ data, attribs = {} }: HtmlComponentProps<'p'>) => {
  const isTip = attribsContainClass('tip', attribs);
  if (isTip) {
    return <Tip data={data} attribs={attribs} />;
  }
  const paragraphClassName = 'text-p2 mb-24 leading-relaxed';
  const modifiedAttribs = { ...attribs, className: paragraphClassName };
  if (attribs?.className?.includes('definition')) {
    modifiedAttribs.className = `${attribs.className} font-mono font-semibold text-code leading-relaxed`;
  } else {
    modifiedAttribs.className = `${modifiedAttribs.className} ${paragraphClassName}`;
  }
  return (
    <p {...modifiedAttribs}>
      <Html data={data} />
    </p>
  );
};

export default Paragraph;
