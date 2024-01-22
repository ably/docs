import { Children, FunctionComponent } from 'react';
import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE } from '../../../../../data/createPages/constants';
import { usePageLanguage } from 'src/contexts';

export const DlWrapper: FunctionComponent<any> = ({ children }) => {
  const { currentLanguage: pageLanguage } = usePageLanguage();

  return Children.map(children, (child) => {
    const attribs = child?.props?.attribs;

    if (attribs?.lang) {
      if (
        (pageLanguage === DEFAULT_LANGUAGE && attribs?.lang === DEFAULT_PREFERRED_LANGUAGE) ||
        attribs?.lang === pageLanguage ||
        attribs?.lang === DEFAULT_LANGUAGE
      ) {
        return child;
      }
      return null;
    }
    return child;
  });
};
