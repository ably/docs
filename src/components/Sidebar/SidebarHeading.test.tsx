import React from 'react';
import { render, screen } from '@testing-library/react';
import { SidebarHeading } from './SidebarHeading';

describe('<SidebarHeading />', () => {
  test('should render font in light and cool-black when not active', () => {
    render(<SidebarHeading as="button">Text</SidebarHeading>);

    expect(screen.getByRole('button')).toHaveClass('font-light text-cool-black');
  });

  test('should render font in medium and active-orange when active', () => {
    render(
      <SidebarHeading isActive as="button">
        Text
      </SidebarHeading>,
    );

    expect(screen.getByRole('button')).toHaveClass('font-medium text-active-orange');
  });

  test('should render font in medium and cool-black when expanded', () => {
    render(
      <SidebarHeading isExpandable as="button">
        Text
      </SidebarHeading>,
    );

    expect(screen.getByRole('button')).toHaveClass('font-medium text-cool-black');
  });
});
