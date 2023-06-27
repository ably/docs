import { render, screen } from '@testing-library/react';
import React from 'react';
import SDKInterfacePanel from './SDKInterfacePanel';

const SDKInterfacePanelProps = {
  selectedSDKInterfaceTab: 'realtime',
  sdkInterfaceAvailable: ['realtime', 'rest'],
  setSelectedSDKInterfaceTab: () => null,
  setPreviousSDKInterfaceTab: () => null,
};

describe(`<SDKInterfacePanel />`, () => {
  it('renders Rest and Realtime buttons', () => {
    render(<SDKInterfacePanel {...SDKInterfacePanelProps} />);
    expect(
      screen.getByRole('button', {
        name: 'Realtime',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'REST',
      }),
    ).toBeInTheDocument();
  });

  it('renders SDK Interface buttons and Realtime as active', () => {
    render(<SDKInterfacePanel {...SDKInterfacePanelProps} />);
    expect(
      screen.getByRole('button', {
        name: 'Realtime',
      }),
    ).toHaveClass('bg-charcoal-grey');
  });

  it('renders SDK Interface buttons and Rest as active', () => {
    render(<SDKInterfacePanel {...SDKInterfacePanelProps} selectedSDKInterfaceTab="rest" />);
    expect(
      screen.getByRole('button', {
        name: 'REST',
      }),
    ).toHaveClass('bg-charcoal-grey');
    expect(
      screen.getByRole('button', {
        name: 'Realtime',
      }),
    ).not.toHaveClass('bg-charcoal-grey');
  });

  it('renders Realtime button only', () => {
    render(<SDKInterfacePanel {...SDKInterfacePanelProps} sdkInterfaceAvailable={['realtime']} />);
    expect(
      screen.getByRole('button', {
        name: 'Realtime',
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: 'REST',
      }),
    ).not.toBeInTheDocument();
  });

  it('renders Rest button only', () => {
    render(<SDKInterfacePanel {...SDKInterfacePanelProps} sdkInterfaceAvailable={['rest']} />);

    expect(
      screen.queryByRole('button', {
        name: 'Realtime',
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'REST',
      }),
    ).toBeInTheDocument();
  });
});
