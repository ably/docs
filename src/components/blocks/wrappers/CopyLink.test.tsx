import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CopyLink from './CopyLink';

describe('<CopyLink />', () => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn(),
    },
  });

  jest.spyOn(navigator.clipboard, 'writeText');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render children without CopyLink', () => {
    render(
      <CopyLink>
        <h1>Inner content</h1>
      </CopyLink>,
    );
    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });

  it('should render copy button', () => {
    render(
      <CopyLink attribs={{ id: 'example-id' }}>
        <h1>Inner content</h1>
      </CopyLink>,
    );
    expect(screen.getByText('Inner content')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should copy link with the header id', () => {
    const id = 'example-id';

    render(
      <CopyLink attribs={{ id }}>
        <h1>Inner content</h1>
      </CopyLink>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`${window.location.href}#${id}`);
  });
});
