import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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

describe('Header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header with logo and links', () => {
    render(<Header />);
    expect(screen.getAllByAltText('Ably logo').length).toBeGreaterThan(0);
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
  });

  it('renders the search bar when hideSearchBar is false', () => {
    render(<Header hideSearchBar={false} />);
    expect(screen.getByText('SearchBar')).toBeInTheDocument();
  });

  it('does not render the search bar when hideSearchBar is true', () => {
    render(<Header hideSearchBar={true} />);
    expect(screen.queryByText('SearchBar')).not.toBeInTheDocument();
  });

  it('toggles the mobile menu when the burger icon is clicked', () => {
    render(<Header />);
    const burgerIcon = screen.getByText('icon-gui-bars-3-outline');
    fireEvent.click(burgerIcon);
    expect(screen.getByText('icon-gui-x-mark-outline')).toBeInTheDocument();
    expect(screen.getByText('LeftSidebar')).toBeInTheDocument();
  });

  it('disables scrolling when the mobile menu is open', () => {
    render(<Header />);
    const burgerIcon = screen.getByText('icon-gui-bars-3-outline');
    fireEvent.click(burgerIcon);
    expect(document.body).toHaveClass('overflow-hidden');
    const closeIcon = screen.getByText('icon-gui-x-mark-outline');
    fireEvent.click(closeIcon);
    expect(document.body).not.toHaveClass('overflow-hidden');
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
            account: { links: { dashboard: { href: '/dashboard', text: 'Dashboard' } } },
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
});
