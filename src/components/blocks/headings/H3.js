import React from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import { ChildPropTypes } from '../../../react-utilities';

const AblyH3 = ({ children }) => <h3 className="ui-text-h3 mb-24">{children}</h3>;

const H3 = LinkableHtmlBlock(AblyH3);

AblyH3.propTypes = {
  children: ChildPropTypes,
};
export default H3;
