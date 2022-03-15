import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';

const removeProp = (prop) => (attribs) => {
  if (!attribs || !attribs[prop]) {
    return attribs;
  }
  delete attribs[prop];
};

const removeStyles = removeProp('style');

const classToClassName = (attribs) => {
  if (!attribs || !attribs.class) {
    return attribs;
  }
  attribs.className = attribs.class;
  delete attribs.class;
  return attribs;
};

const keyFromID = (attribs) => {
  if (!attribs || !attribs.id) {
    return attribs;
  }
  attribs.key = attribs.id;
  return attribs;
};

const filterAttribsForReact = compose(classToClassName, keyFromID, removeStyles);

const ChildPropTypes = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]);

export { filterAttribsForReact, ChildPropTypes };
