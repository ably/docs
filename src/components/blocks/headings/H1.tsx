import React, { FC } from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import { HtmlAttributes } from 'src/components/html-component-props';

const AblyH1: FC<HtmlAttributes<'h1'>> = ({ children, ...attribs }) => (
  <h1 className="ui-text-h1" {...attribs}>
    {children}
  </h1>
);

const H1 = LinkableHtmlBlock(AblyH1, 'mb-40');

export default H1;
