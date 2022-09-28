import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CodeCopyButton from './CodeCopyButton';

describe('<CodeCopyButton />', () => {
  it('Copies elements onClick of copy button', async () => {
    const content = 'hello world';
    render(<CodeCopyButton content={content} />);
    await userEvent.click(screen.getByRole('button'));
    expect(window.navigator.clipboard).toHaveBeenCalledWith(content);
  });
});
