import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Notification, NotificationVariant } from './Notification';

const props = {
  variant: NotificationVariant.Warning,
  message: 'Version 1.1. We recommend',
  linkText: 'the latest version, 1.2',
  href: 'https://ably.com/documentation',
  className: 'custom-classname',
};

describe('<Notification />', () => {
  it('should render Warning notification correctly', async () => {
    render(<Notification {...props} />);

    expect(screen.getByText('Warning:')).toBeInTheDocument();
    expect(screen.getByText(props.message)).toBeInTheDocument();
    expect(screen.getByText(props.linkText)).toBeInTheDocument();
    expect(screen.getByText(props.linkText).closest('a')).toHaveAttribute('href', props.href);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dismiss the notification on close', async () => {
    const { container } = render(<Notification {...props} />);

    await userEvent.click(screen.getByRole('button'));
    expect(container.firstChild).toBeNull();
  });
});
