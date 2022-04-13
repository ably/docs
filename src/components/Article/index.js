import React from 'react';
import PropTypes from 'prop-types';
import { ChildPropTypes } from '../../react-utilities';

const Article = ({ columns = 3, children }) => (
  <article className={`col-span-${columns} grid grid-cols-3`}>{children}</article>
);

Article.propTypes = {
  columns: PropTypes.number,
  children: ChildPropTypes,
};

export default Article;
