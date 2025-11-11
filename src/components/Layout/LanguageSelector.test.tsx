import React from 'react';
import { useLocation } from '@reach/router';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LanguageSelector } from './LanguageSelector';
import { useLayoutContext } from 'src/contexts/layout-context';
import { navigate } from '../Link';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn(),
}));

jest.mock('@ably/ui/core/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div>{name}</div>,
}));

jest.mock('@ably/ui/core/Badge', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../Link', () => ({
  navigate: jest.fn(),
}));

const mockUseLayoutContext = useLayoutContext as jest.Mock;

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useLocation: jest.fn(),
}));

const mockUseLocation = useLocation as jest.Mock;

jest.mock('src/data/languages', () => ({
  languageData: {
    pubsub: {
      javascript: '1.0',
      python: '1.0',
      ruby: '1.0',
    },
  },
  languageInfo: {
    javascript: { label: 'JavaScript' },
    python: { label: 'Python' },
    ruby: { label: 'Ruby' },
  },
}));

describe('LanguageSelector', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue({
      pathname: '/some-path',
      search: '',
      hash: '',
      state: null,
    });

    mockUseLayoutContext.mockReturnValue({
      activePage: {
        tree: [0],
        languages: ['javascript', 'python'],
        language: 'javascript',
      },
      products: [['pubsub']],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the LanguageSelector component with default language (JS)', () => {
    render(<LanguageSelector />);
    expect(screen.getByText('icon-gui-chevron-down-micro')).toBeInTheDocument();
    expect(screen.getByText('icon-tech-javascript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('opens the dropdown menu on click', async () => {
    render(<LanguageSelector />);
    const trigger = screen.getByRole('combobox', { name: /select code language/i });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Code Language')).toBeInTheDocument();
    });
  });

  it('renders language options', async () => {
    render(<LanguageSelector />);
    const trigger = screen.getByRole('combobox', { name: /select code language/i });
    fireEvent.click(trigger);

    await waitFor(() => {
      const items = screen.getAllByText('JavaScript');
      // One in trigger, one in dropdown
      expect(items.length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Python')).toBeInTheDocument();
    });
  });

  it('closes the dropdown menu on escape key', async () => {
    render(<LanguageSelector />);
    const trigger = screen.getByRole('combobox', { name: /select code language/i });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Code Language')).toBeInTheDocument();
    });

    fireEvent.keyDown(trigger, { key: 'Escape', code: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByText('Code Language')).not.toBeInTheDocument();
    });
  });

  it('filters options based on activePage.languages', async () => {
    render(<LanguageSelector />);
    const trigger = screen.getByRole('combobox', { name: /select code language/i });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.queryByText('Ruby')).not.toBeInTheDocument();
    });
  });

  it('sets the default option to Python when language is python', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        tree: [0],
        languages: ['javascript', 'python'],
        language: 'python',
      },
      products: [['pubsub']],
    });

    render(<LanguageSelector />);
    expect(screen.getByText('icon-tech-python')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('navigates when a language option is selected', async () => {
    render(<LanguageSelector />);
    const trigger = screen.getByRole('combobox', { name: /select code language/i });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Python')).toBeInTheDocument();
    });

    const pythonOption = screen.getByRole('option', { name: /python/i });
    fireEvent.click(pythonOption);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/some-path?lang=python');
    });
  });
});
