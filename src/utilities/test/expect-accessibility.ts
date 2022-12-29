import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { JSXElementConstructor, ReactElement } from 'react';

export const expectAccessibility = async (Element: ReactElement<unknown, string | JSXElementConstructor<unknown>>) => {
  const { container } = render(Element);
  const accessibilityResults = await axe(container);
  expect(accessibilityResults).toHaveNoViolations();
};
