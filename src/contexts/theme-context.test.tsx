import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './theme-context';
import { THEME_STORAGE_KEY } from 'src/utilities/theme';

const mockMatchMedia = (prefersDark: boolean) => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: prefersDark,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

const Probe = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme('dark')}>set dark</button>
      <button onClick={() => setTheme('system')}>set system</button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('ui-theme-light', 'ui-theme-dark');
    mockMatchMedia(false);
  });

  it('defaults to light and sets ui-theme-light on <html>', () => {
    renderWithProvider();
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    expect(document.documentElement).toHaveClass('ui-theme-light');
  });

  it('persists the choice and swaps the <html> class when it changes', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('set dark'));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('ui-theme-dark');
    expect(document.documentElement).not.toHaveClass('ui-theme-light');
  });

  it('resolves "system" to the OS preference', () => {
    mockMatchMedia(true); // OS prefers dark
    renderWithProvider();
    fireEvent.click(screen.getByText('set system'));
    expect(screen.getByTestId('theme')).toHaveTextContent('system');
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('ui-theme-dark');
  });

  it('reads the persisted choice on mount', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    renderWithProvider();
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('ui-theme-dark');
  });

  it('falls back to the default when the persisted value is invalid', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'not-a-theme');
    renderWithProvider();
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(document.documentElement).toHaveClass('ui-theme-light');
    expect(document.documentElement).not.toHaveClass('ui-theme-dark');
  });

  it('throws if useTheme is used without a provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => render(<Probe />)).toThrow('useTheme must be used within a ThemeProvider');
    spy.mockRestore();
  });
});
