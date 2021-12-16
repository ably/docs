import React from 'react';

import Meganav from '@ably/ui/core/Meganav';

import ablyStack from '@ably/ui/core/images/ably-stack.svg';

const Header = () => (
  <Meganav
    paths={{
      ablyStack,
    }}
  />
);

export default Header;
