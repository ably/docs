import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LanguageSelector } from './LanguageSelector';
import { useLayoutContext } from 'src/contexts/layout-context';

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

const mockUseLayoutContext = useLayoutContext as jest.Mock;

const mockLanguageData = {
  pubsub: {
    javascript: 1.0,
    python: 1.0,
  },
};

const mockLanguageInfo = {
  javascript: { label: 'JavaScript' },
  python: { label: 'Python' },
};

describe('LanguageSelector', () => {
  beforeEach(() => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        tree: [0],
      },
      products: [['pubsub']],
    });

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { search: '' },
    });

    jest.spyOn(window, 'URLSearchParams').mockImplementation(
      () =>
        ({
          get: jest.fn().mockReturnValue(null),
        }) as unknown as URLSearchParams,
    );

    jest.mock('src/data/languages', () => ({
      languageData: mockLanguageData,
      languageInfo: mockLanguageInfo,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the LanguageSelector component', () => {
    render(<LanguageSelector />);
    expect(screen.getByText('icon-gui-chevron-down')).toBeInTheDocument();
  });

  it('opens the dropdown menu on click', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByText('icon-gui-chevron-down'));
    expect(screen.getByText('Code Language')).toBeInTheDocument();
  });

  it('renders language options', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByText('icon-gui-chevron-down'));
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('closes the dropdown menu on outside click', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByText('icon-gui-chevron-down'));
    fireEvent.mouseDown(document);
    expect(screen.queryByText('Code Language')).not.toBeInTheDocument();
  });
});
