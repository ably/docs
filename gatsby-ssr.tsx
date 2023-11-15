import React from 'react';
import { getSandpackCssText } from '@codesandbox/sandpack-react';

const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <style
      id="sandpack"
      key="sandpack-css"
      dangerouslySetInnerHTML={{
        __html: getSandpackCssText(),
      }}
    />,
  ]);
};

/**
 * Load our user state
 */
import UserContextWrapper from './src/contexts/user-context/wrap-with-provider';
const wrapRootElement = UserContextWrapper;

export { onRenderBody, wrapRootElement };
