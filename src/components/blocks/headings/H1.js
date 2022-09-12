import React from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import { ChildPropTypes } from '../../../react-utilities';

const AblyH1 = ({ children, ...attribs }) => (
  <h1 className="ui-text-h1" {...attribs}>
    {children}
  </h1>
);

const H1 = LinkableHtmlBlock(AblyH1, 'mb-40');

AblyH1.propTypes = {
  children: ChildPropTypes,
};
export default H1;
