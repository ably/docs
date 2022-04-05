import React from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import PropTypes from 'prop-types';

const AblyH2 = ({ children }) => <h2 className="ui-text-h2 mb-32">{children}</h2>;

const H2 = LinkableHtmlBlock(AblyH2);

AblyH2.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};
export default H2;
