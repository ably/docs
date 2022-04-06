import React from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import { ChildPropTypes } from '../../../react-utilities';

const AblyH2 = ({ children }) => <h2 className="ui-text-h2 mb-32">{children}</h2>;

const H2 = LinkableHtmlBlock(AblyH2);

AblyH2.propTypes = {
  children: ChildPropTypes,
};
export default H2;
