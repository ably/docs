import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonWithTooltip from './ButtonWithTooltip';

describe('<ButtonWithToopltip />', () => {
  const onClickMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a button with a tooltip', async () => {
    render(
      <ButtonWithTooltip tooltip="Copy tooltip" notification="It has been copied!" onClick={onClickMock}>
        Copy text
      </ButtonWithTooltip>,
    );

    expect(screen.getByText('Copy tooltip')).toBeInTheDocument();
    expect(screen.getByText('It has been copied!')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Copy text'));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
