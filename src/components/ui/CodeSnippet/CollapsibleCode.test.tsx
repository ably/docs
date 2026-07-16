import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CollapsibleCode from './CollapsibleCode';

describe('CollapsibleCode', () => {
  it('renders children without a toggle when at or under the line limit', () => {
    render(
      <CollapsibleCode lineCount={5} maxLines={15}>
        <pre>short snippet</pre>
      </CollapsibleCode>,
    );

    expect(screen.getByText('short snippet')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows a "Show more" toggle when the snippet exceeds the line limit', () => {
    render(
      <CollapsibleCode lineCount={40} maxLines={15}>
        <pre>long snippet</pre>
      </CollapsibleCode>,
    );

    const toggle = screen.getByRole('button', { name: /show more/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles between "Show more" and "Show less"', () => {
    render(
      <CollapsibleCode lineCount={40} maxLines={15}>
        <pre>long snippet</pre>
      </CollapsibleCode>,
    );

    fireEvent.click(screen.getByRole('button', { name: /show more/i }));

    const toggle = screen.getByRole('button', { name: /show less/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument();
  });
});
