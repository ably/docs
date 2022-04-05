import React from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import PropTypes from 'prop-types';

const AblyH4 = ({ children }) => <h4 className="ui-text-h3 mb-24">{children}</h4>;

const H4 = LinkableHtmlBlock(AblyH4);

AblyH4.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};
export default H4;
