import { Children, FunctionComponent, useContext } from 'react';
import PageLanguageContext from '../../../../contexts/page-language-context';
import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE } from '../../../../../data/createPages/constants';

export const DlWrapper: FunctionComponent<any> = ({ children }) => {
  const language = useContext(PageLanguageContext);

  return Children.map(children, (child) => {
    const { attribs } = child?.props;

    if (attribs?.lang) {
      if (
        (language === DEFAULT_LANGUAGE && attribs?.lang === DEFAULT_PREFERRED_LANGUAGE) ||
        attribs?.lang === language ||
        attribs?.lang === DEFAULT_LANGUAGE
      ) {
        return child;
      }
      return null;
    }
    return child;
  });
};
