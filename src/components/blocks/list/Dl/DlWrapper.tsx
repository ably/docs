import { Children, FunctionComponent } from 'react';

export const DlWrapper: FunctionComponent<any> = ({ children }) => {
  return Children.map(children, (child) => {
    const attribs = child?.props?.attribs;

    if (attribs?.lang) {
      return child;
    }
    return child;
  });
};
