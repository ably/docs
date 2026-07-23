import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

const mockSetTheme = jest.fn();
let mockCurrentTheme = 'system';

jest.mock('src/contexts/theme-context', () => ({
  useTheme: () => ({ theme: mockCurrentTheme, resolvedTheme: 'light', setTheme: mockSetTheme }),
}));

jest.mock('@ably/ui/core/insights', () => ({ track: jest.fn() }));

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
    mockCurrentTheme = 'system';
  });

  it('renders the three theme options in a radiogroup', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('radiogroup', { name: 'Theme' })).toBeInTheDocument();
    ['System theme', 'Dark theme', 'Light theme'].forEach((label) => {
      expect(screen.getByRole('radio', { name: label })).toBeInTheDocument();
    });
  });

  it('marks the active theme with aria-checked', () => {
    mockCurrentTheme = 'dark';
    render(<ThemeToggle />);
    expect(screen.getByRole('radio', { name: 'Dark theme' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'System theme' })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('radio', { name: 'Light theme' })).toHaveAttribute('aria-checked', 'false');
  });

  it('calls setTheme with the selected value when a cell is clicked', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('radio', { name: 'Light theme' }));
    expect(mockSetTheme).toHaveBeenCalledWith('light');
    fireEvent.click(screen.getByRole('radio', { name: 'Dark theme' }));
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
