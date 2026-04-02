import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content A');
  });

  it('switches content when a tab is clicked', async () => {
    const user = userEvent.setup();
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

    await user.click(screen.getByRole('tab', { name: 'Beta' }));

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content B');
  });

  it('sets aria-selected correctly', async () => {
    const user = userEvent.setup();
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

    await user.click(screen.getByRole('tab', { name: 'Beta' }));

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
});
