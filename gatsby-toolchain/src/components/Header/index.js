import React from 'react';
import PropTypes from 'prop-types';
import Meganav from '@ably/ui/core/Meganav';
import TopCodeMenu from '../Menu/top-code-menu';
import ablyStack from '@ably/ui/core/images/ably-stack.svg';

const Header = ({ languages }) => (
  <>
    <Meganav
      paths={{
        ablyStack,
      }}
    />
    <TopCodeMenu languages={languages} />
  </>
);

Header.propTypes = {
  languages: PropTypes.array,
};

export default Header;
