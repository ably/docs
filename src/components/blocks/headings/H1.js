import React from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import PropTypes from 'prop-types';

const AblyH1 = ({ children }) => <h1 className="ui-text-h1 mb-40">{children}</h1>;

const H1 = LinkableHtmlBlock(AblyH1);

AblyH1.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};
export default H1;
