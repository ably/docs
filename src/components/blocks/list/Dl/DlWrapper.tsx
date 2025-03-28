import { Children, FunctionComponent } from 'react';
import { useLayoutContext, DEFAULT_LANGUAGE } from 'src/contexts/layout-context';

export const DlWrapper: FunctionComponent<unknown> = ({ children }) => {
  const { activePage } = useLayoutContext();

  return Children.map(children, (child) => {
    const attribs = child?.props?.attribs;

    if (attribs?.lang) {
      if (
        (activePage.language === DEFAULT_LANGUAGE && attribs?.lang === DEFAULT_LANGUAGE) ||
        attribs?.lang === activePage.language ||
        attribs?.lang === DEFAULT_LANGUAGE
      ) {
        return child;
      }
      return null;
    }
    return child;
  });
};
