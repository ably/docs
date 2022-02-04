import React from 'react';

import Meganav from '@ably/ui/core/Meganav';
import TopCodeMenu from '../Menu/top-code-menu';

import ablyStack from '@ably/ui/core/images/ably-stack.svg';

const Header = ({ languages }) => (
  <><Meganav
    paths={{
      ablyStack,
    }}
  />
  <TopCodeMenu languages={ languages } />
</>);

export default Header;
