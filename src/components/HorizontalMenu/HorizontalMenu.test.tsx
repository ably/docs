import React from 'react';
import { render, screen } from '@testing-library/react';
import HorizontalMenu, { HorizontalMenuVariant } from './HorizontalMenu';

describe('<HorizontalMenu />', () => {
  it('should render light menu', () => {
    render(<HorizontalMenu variant={HorizontalMenuVariant.light}>children go here</HorizontalMenu>);
    expect(screen.getByRole('menu')).toMatchInlineSnapshot(`
      <menu
        class="light"
        role="menu"
      >
        children go here
      </menu>
    `);
  });
  it('should render end menu', () => {
    render(<HorizontalMenu variant={HorizontalMenuVariant.end}>children go here</HorizontalMenu>);
    expect(screen.getByRole('menu')).toMatchInlineSnapshot(`
      <menu
        class="end"
        role="menu"
      >
        children go here
      </menu>
    `);
  });
});
