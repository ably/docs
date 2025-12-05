import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useStaticQuery } from 'gatsby';
import Header from './Header';
import UserContext from 'src/contexts/user-context';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn(),
}));

jest.mock('@ably/ui/core/Icon', () => {
  const MockIcon: React.FC<{ name: string }> = ({ name }) => <div>{name}</div>;
  MockIcon.displayName = 'MockIcon';
  return MockIcon;
});

jest.mock('@ably/ui/core/LinkButton', () => {
  const MockButton: React.FC<{ children: React.ReactNode }> = ({ children }) => <button>{children}</button>;
  MockButton.displayName = 'MockButton';
  return MockButton;
});

jest.mock('../SearchBar', () => ({
  SearchBar: jest.fn(() => <div>SearchBar</div>),
}));

jest.mock('./LeftSidebar', () => ({
  __esModule: true,
  default: jest.fn(() => <div>LeftSidebar</div>),
}));

jest.mock('@reach/router', () => ({
  useLocation: jest.fn().mockReturnValue({ pathname: '/docs' }),
}));

jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  useStaticQuery: jest.fn().mockReturnValue({
    site: {
      siteMetadata: {
        externalScriptsData: {
          inkeepSearchEnabled: true,
          inkeepChatEnabled: true,
        },
      },
    },
  }),
  graphql: jest.fn(),
}));

jest.mock('./LanguageSelector', () => ({
  LanguageSelector: jest.fn(() => <div>LanguageSelector</div>),
}));

jest.mock('../Link', () => {
  const MockLink: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ children }) => (
    <a>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header with logo and links', () => {
    render(<Header />);
    expect(screen.getByAltText('Ably')).toBeInTheDocument();

    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
  });

  it('toggles the mobile menu when the burger icon is clicked', () => {
    render(<Header />);
    const burgerIcon = screen.getByText('icon-gui-bars-3-outline');
    fireEvent.click(burgerIcon);
    expect(screen.getByText('LeftSidebar')).toBeInTheDocument();
  });

  it('renders the sign in buttons when not signed in', () => {
    render(
      <UserContext.Provider value={{ sessionState: { signedIn: false }, apps: [] }}>
        <Header />
      </UserContext.Provider>,
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Start free')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('renders the dashboard button when signed in', () => {
    render(
      <UserContext.Provider
        value={{
          sessionState: {
            signedIn: true,
            account: {
              id: 'test-id',
              name: 'Test Account',
              links: { dashboard: { href: '/dashboard', text: 'Dashboard' } },
            },
          },
          apps: [],
        }}
      >
        <Header />
      </UserContext.Provider>,
    );
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Start free')).not.toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('does not render search bar when inkeepSearchEnabled is false', () => {
    (useStaticQuery as jest.Mock).mockReturnValue({
      site: {
        siteMetadata: {
          externalScriptsData: {
            inkeepSearchEnabled: false,
            inkeepChatEnabled: true,
          },
        },
      },
    });

    render(<Header />);

    const searchBar = document.getElementById('inkeep-search');
    expect(searchBar).not.toBeInTheDocument();
  });

  it('does not render Ask AI button and chat bar when inkeepChatEnabled is false', () => {
    (useStaticQuery as jest.Mock).mockReturnValue({
      site: {
        siteMetadata: {
          externalScriptsData: {
            inkeepSearchEnabled: true,
            inkeepChatEnabled: false,
          },
        },
      },
    });

    render(<Header />);

    expect(screen.queryByText('Ask AI')).not.toBeInTheDocument();
    const chatBar = document.getElementById('inkeep-ai-chat');
    expect(chatBar).not.toBeInTheDocument();
  });

  it('does not render search bar or Ask AI button when both flags are false', () => {
    (useStaticQuery as jest.Mock).mockReturnValue({
      site: {
        siteMetadata: {
          externalScriptsData: {
            inkeepSearchEnabled: false,
            inkeepChatEnabled: false,
          },
        },
      },
    });

    render(<Header />);

    expect(screen.queryByText('Ask AI')).not.toBeInTheDocument();
    const searchBar = document.getElementById('inkeep-search');
    const chatBar = document.getElementById('inkeep-ai-chat');
    expect(searchBar).not.toBeInTheDocument();
    expect(chatBar).not.toBeInTheDocument();
  });
});
