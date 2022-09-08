import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuItemButton from './MenuItemButton';

describe('<MenuItemButton />', () => {
  const onClickMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the button', () => {
    render(<MenuItemButton>Menu Item</MenuItemButton>);

    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button"
      >
        Menu Item
      </button>
    `);
  });

  it('should render isSelected class on button', () => {
    render(<MenuItemButton isSelected>Selected Item</MenuItemButton>);

    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button isSelected"
      >
        Selected Item
      </button>
    `);
  });

  it('should trigger onClick event', async () => {
    render(
      <MenuItemButton isSelected onClick={onClickMock}>
        Selected Item
      </MenuItemButton>,
    );

    await userEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
