import React from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import PropTypes from 'prop-types';

const AblyH3 = ({ children }) => <h3 className="ui-text-h3 mb-24">{children}</h3>;

const H3 = LinkableHtmlBlock(AblyH3);

AblyH3.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};
export default H3;
