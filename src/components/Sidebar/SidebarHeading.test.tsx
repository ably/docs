import React from 'react';
import { render, screen } from '@testing-library/react';
import { SidebarHeading } from './SidebarHeading';

describe('<SidebarHeading />', () => {
  test('should render font in cool-black when not active', () => {
    render(<SidebarHeading as="button">Text</SidebarHeading>);

    expect(screen.getByRole('button')).toHaveClass('text-cool-black');
  });

  test('should render font active-orange when active', () => {
    render(
      <SidebarHeading isActive as="button">
        Text
      </SidebarHeading>,
    );

    expect(screen.getByRole('button')).toHaveClass('text-active-orange');
  });
});
