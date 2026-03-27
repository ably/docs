import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders title and intro', () => {
    render(<PageHeader title="Test Page" intro="Test intro text" />);

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Test intro text')).toBeInTheDocument();
  });

  it('renders title without intro', () => {
    render(<PageHeader title="Test Page" intro="" />);

    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });
});
