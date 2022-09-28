import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CodeCopyButton from './CodeCopyButton';

describe('<CodeCopyButton />', () => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn(),
    },
  });

  jest.spyOn(navigator.clipboard, 'writeText');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Copies elements onClick of copy button', async () => {
    const content = 'hello world';
    render(<CodeCopyButton content={content} />);
    await userEvent.click(screen.getByRole('button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(content);
  });
});
