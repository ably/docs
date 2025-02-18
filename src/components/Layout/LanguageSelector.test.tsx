import React from 'react';
import { useLocation } from '@reach/router';
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

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useLocation: jest.fn(),
}));

const mockUseLocation = useLocation as jest.Mock;

const mockLanguageData = {
  pubsub: {
    javascript: 1.0,
    python: 1.0,
    ruby: 1.0,
  },
};

const mockLanguageInfo = {
  javascript: { label: 'JavaScript' },
  python: { label: 'Python' },
  ruby: { label: 'Ruby' },
};

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

  it('renders the LanguageSelector component with default language (JS)', () => {
    render(<LanguageSelector />);
    expect(screen.getByText('icon-gui-chevron-down-micro')).toBeInTheDocument();
    expect(screen.getByText('icon-tech-javascript')).toBeInTheDocument();
  });

  it('opens the dropdown menu on click', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByText('icon-gui-chevron-down-micro'));
    expect(screen.getByText('Code Language')).toBeInTheDocument();
  });

  it('renders language options', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByText('icon-gui-chevron-down-micro'));
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('closes the dropdown menu on outside click', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByText('icon-gui-chevron-down-micro'));
    fireEvent.mouseDown(document);
    expect(screen.queryByText('Code Language')).not.toBeInTheDocument();
  });

  it('filters options based on activePage.languages', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByText('icon-gui-chevron-down-micro'));
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.queryByText('Ruby')).not.toBeInTheDocument();
  });

  it('sets the default option to Python when ?lang=python is in the URL', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/some-path',
      search: '?lang=python',
      hash: '',
      state: null,
    });

    jest.spyOn(window, 'URLSearchParams').mockImplementation(
      () =>
        ({
          get: jest.fn((key) => {
            if (key === 'lang') {
              return 'python';
            }
            return null;
          }),
        }) as unknown as URLSearchParams,
    );

    render(<LanguageSelector />);
    expect(screen.queryByText('icon-tech-javascript')).not.toBeInTheDocument();
    expect(screen.getByText('icon-tech-python')).toBeInTheDocument();
  });
});
