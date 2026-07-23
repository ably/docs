import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import { track } from '@ably/ui/core/insights';
import Header from './Header';
import UserContext from 'src/contexts/user-context';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn().mockReturnValue({
    activePage: {
      tree: [],
      page: { name: '', link: '' },
      languages: [],
      language: 'javascript',
      product: null,
      template: null,
    },
  }),
}));

jest.mock('@ably/ui/core/insights', () => ({
  track: jest.fn(),
}));

jest.mock('src/components/Icon', () => {
  const MockIcon: React.FC<{ name: string }> = ({ name }) => <div>{name}</div>;
  MockIcon.displayName = 'MockIcon';
  return MockIcon;
});

jest.mock('src/components/ui/LinkButton', () => {
  const MockButton: React.FC<{ children: React.ReactNode }> = ({ children }) => <button>{children}</button>;
  MockButton.displayName = 'MockButton';
  return MockButton;
});

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
    // Two logo variants render (light + dark, CSS-toggled); both carry the alt.
    expect(screen.getAllByAltText('Ably').length).toBeGreaterThan(0);

    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
  });

  it('toggles the mobile menu when the burger icon is clicked', () => {
    render(<Header />);
    const burgerButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    fireEvent.click(burgerButton);
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

  it('always renders the Ask AI button, but not the chat instance, when inkeepChatEnabled is false', () => {
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

    // The Ask AI button always renders; only the Inkeep chat instance is flag-gated.
    expect(screen.getByText('Ask AI')).toBeInTheDocument();
    const chatBar = document.getElementById('inkeep-ai-chat');
    expect(chatBar).not.toBeInTheDocument();
  });

  it('always renders the search trigger and Ask AI button, but not the Inkeep instances, when both flags are false', () => {
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

    // Our own search trigger and the Ask AI button are always present; the Inkeep
    // search/chat instances only mount when their flags are enabled.
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Ask AI')).toBeInTheDocument();
    const searchBar = document.getElementById('inkeep-search');
    const chatBar = document.getElementById('inkeep-ai-chat');
    expect(searchBar).not.toBeInTheDocument();
    expect(chatBar).not.toBeInTheDocument();
  });

  // Mimics Inkeep having mounted its widget: a child `div` whose open shadow root holds
  // the real trigger `button`. This is the exact structure the header reaches into to
  // open the modal, so it pins down the shadow-DOM click path that jsdom can't exercise
  // against the real widget. If the selector chain (`#host > div` → shadowRoot → button)
  // regresses, these go red.
  const mountInkeepTrigger = (hostId: string) => {
    const host = document.getElementById(hostId);
    const inner = document.createElement('div');
    host?.appendChild(inner);
    const triggerButton = document.createElement('button');
    inner.attachShadow({ mode: 'open' }).appendChild(triggerButton);
    const clickSpy = jest.fn();
    triggerButton.addEventListener('click', clickSpy);
    return clickSpy;
  };

  // Both Inkeep instances must be mounted for their hidden holders to exist, so explicitly
  // enable the flags here — earlier tests leave useStaticQuery returning them disabled.
  const enableInkeep = () =>
    (useStaticQuery as jest.Mock).mockReturnValue({
      site: {
        siteMetadata: {
          externalScriptsData: { inkeepSearchEnabled: true, inkeepChatEnabled: true },
        },
      },
    });

  it('opens the Inkeep search modal and tracks the click when the search trigger is clicked', () => {
    enableInkeep();
    render(<Header />);
    const clickSpy = mountInkeepTrigger('inkeep-search');

    fireEvent.click(screen.getByText('Search'));

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith('docs_search_button_clicked');
  });

  it('opens the Inkeep chat modal and tracks the click when the Ask AI button is clicked', () => {
    enableInkeep();
    render(<Header />);
    const clickSpy = mountInkeepTrigger('inkeep-ai-chat');

    fireEvent.click(screen.getByText('Ask AI'));

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith('docs_ask_ai_button_clicked');
  });
});
