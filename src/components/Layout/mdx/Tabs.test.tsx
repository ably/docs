import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, Tab } from './Tabs';

describe('Tabs', () => {
  it('renders tab buttons with author-defined labels', () => {
    render(
      <Tabs>
        <Tab value="a" label="Alpha">
          Content A
        </Tab>
        <Tab value="b" label="Beta">
          Content B
        </Tab>
      </Tabs>,
    );

    expect(screen.getByRole('tab', { name: 'Alpha' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Beta' })).toBeInTheDocument();
  });

  it('shows the first tab content by default', () => {
    render(
      <Tabs>
        <Tab value="a" label="Alpha">
          Content A
        </Tab>
        <Tab value="b" label="Beta">
          Content B
        </Tab>
      </Tabs>,
    );

    expect(screen.getByText('Content A')).toBeInTheDocument();
    expect(screen.queryByText('Content B')).not.toBeInTheDocument();
  });

  it('switches content when a tab is clicked', () => {
    render(
      <Tabs>
        <Tab value="a" label="Alpha">
          Content A
        </Tab>
        <Tab value="b" label="Beta">
          Content B
        </Tab>
      </Tabs>,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Beta' }));

    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });

  it('sets aria-selected correctly', () => {
    render(
      <Tabs>
        <Tab value="a" label="Alpha">
          Content A
        </Tab>
        <Tab value="b" label="Beta">
          Content B
        </Tab>
      </Tabs>,
    );

    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(screen.getByRole('tab', { name: 'Beta' }));

    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders a tabpanel for the active tab', () => {
    render(
      <Tabs>
        <Tab value="a" label="Alpha">
          Content A
        </Tab>
        <Tab value="b" label="Beta">
          Content B
        </Tab>
      </Tabs>,
    );

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content A');
  });

  it('renders nothing for Tab used outside of Tabs', () => {
    const { container } = render(
      <Tab value="a" label="Alpha">
        Orphan
      </Tab>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
