import React, { FunctionComponent, useContext, Children } from 'react';
import PageLanguageContext from 'src/contexts/page-language-context';
import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE } from '../../../../data/createPages/constants';

export const BlockWrapper: FunctionComponent<any> = ({ children }) => {
  const language = useContext(PageLanguageContext);

  return children;
};
