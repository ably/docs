import React from 'react';
import PropTypes from 'prop-types';

const Img = ({ attribs }) => {
    console.log(attribs && attribs.src && attribs.src.replace(/^\/images(.*)/, '$1'));
    return (
  <img src={attribs && attribs.src && attribs.src.replace(/^\/images(.*)/, '$1')} {...attribs} />
);
    }
Img.propTypes = {
  src: PropTypes.string,
  attribs: PropTypes.object,
};

export default Img;
