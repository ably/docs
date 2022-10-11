import React from 'react';
import LinkableHtmlBlock from 'src/components/blocks/Html/LinkableHtmlBlock';
import { HtmlAttributes } from 'src/components/html-component-props';

const AblyH5 = ({ ...props }: HtmlAttributes<'h5'>) => (
  <h5 className="ui-text-h5 font-sans my-16 font-bold leading-normal" {...props} />
);

export default LinkableHtmlBlock(AblyH5);
