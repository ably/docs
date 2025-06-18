import { Children, FunctionComponent } from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';

type DlWrapperProps = {
  children: React.ReactElement<{
    attribs?: {
      lang?: string;
    };
  }>[];
};

export const DlWrapper: FunctionComponent<DlWrapperProps> = ({ children }) => {
  const { activePage } = useLayoutContext();

  return Children.map(children, (child) => {
    const attribs = child?.props?.attribs;

    if (attribs?.lang) {
      if (attribs.lang === activePage.language) {
        return child;
      }
      return null;
    }
    return child;
  });
};
