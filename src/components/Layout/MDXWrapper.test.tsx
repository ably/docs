import React, { ReactNode } from 'react';
import { WindowLocation } from '@reach/router';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Helmet } from 'react-helmet';
import If from './mdx/If';
import CodeSnippet from '@ably/ui/core/CodeSnippet';
import UserContext from 'src/contexts/user-context';
import MDXWrapper from './MDXWrapper';

const mockUseLayoutContext = jest.fn(() => ({
  activePage: { language: 'javascript', languages: ['javascript'], product: 'pubsub' },
}));

// Mock the layout context
jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: () => mockUseLayoutContext(),
  LayoutProvider: ({ children }: { children: ReactNode }) => <div data-testid="layout-provider">{children}</div>,
}));

jest.mock('@reach/router', () => ({
  useLocation: () => ({ pathname: '/docs/test-page' }),
}));

jest.mock('src/hooks/use-site-metadata', () => ({
  useSiteMetadata: () => ({
    canonicalUrl: (path: string) => `https://example.com${path}`,
  }),
}));

// We need to mock minimal implementation of other dependencies that CodeSnippet might use
jest.mock('@ably/ui/core/Icon', () => {
  return {
    __esModule: true,
    default: ({ name, size, additionalCSS, color }: any) => (
      <span
        data-testid={`icon-${name}`}
        className={`${additionalCSS || ''} ${color || ''}`}
        style={{ width: size, height: size }}
      >
        {name}
      </span>
    ),
  };
});

// Mock Code component used by CodeSnippet
jest.mock('@ably/ui/core/Code', () => {
  return {
    __esModule: true,
    default: ({ language, snippet }: any) => (
      <pre data-testid={`code-${language}`}>
        <code>{snippet}</code>
      </pre>
    ),
  };
});

describe('MDX component integration', () => {
  it('renders basic content correctly', () => {
    render(
      <div>
        <h1>Test Heading</h1>
        <p>Test paragraph</p>
      </div>,
    );

    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Test paragraph')).toBeInTheDocument();
  });

  it('conditionally renders content with If component', () => {
    render(
      <div>
        <If lang="javascript">This should be visible</If>
        <If lang="ruby">This should not be visible</If>
      </div>,
    );

    expect(screen.getByText('This should be visible')).toBeInTheDocument();
    expect(screen.queryByText('This should not be visible')).not.toBeInTheDocument();
  });

  describe('If component loggedIn functionality', () => {
    it('shows content when loggedIn=true and user is signed in', () => {
      render(
        <UserContext.Provider value={{ sessionState: { signedIn: true }, apps: [] }}>
          <div>
            <If loggedIn={true}>This should be visible for signed-in users</If>
          </div>
        </UserContext.Provider>,
      );

      expect(screen.getByText('This should be visible for signed-in users')).toBeInTheDocument();
    });

    it('hides content when loggedIn=true and user is signed out', () => {
      render(
        <UserContext.Provider value={{ sessionState: { signedIn: false }, apps: [] }}>
          <div>
            <If loggedIn={true}>This should not be visible for signed-out users</If>
          </div>
        </UserContext.Provider>,
      );

      expect(screen.queryByText('This should not be visible for signed-out users')).not.toBeInTheDocument();
    });

    it('shows content when loggedIn=false and user is signed out', () => {
      render(
        <UserContext.Provider value={{ sessionState: { signedIn: false }, apps: [] }}>
          <div>
            <If loggedIn={false}>This should be visible for signed-out users</If>
          </div>
        </UserContext.Provider>,
      );

      expect(screen.getByText('This should be visible for signed-out users')).toBeInTheDocument();
    });

    it('hides content when loggedIn=false and user is signed in', () => {
      render(
        <UserContext.Provider value={{ sessionState: { signedIn: true }, apps: [] }}>
          <div>
            <If loggedIn={false}>This should not be visible for signed-in users</If>
          </div>
        </UserContext.Provider>,
      );

      expect(screen.queryByText('This should not be visible for signed-in users')).not.toBeInTheDocument();
    });

    it('shows content when loggedIn is undefined (no auth check)', () => {
      render(
        <div>
          <If>This should always be visible when no auth check</If>
        </div>,
      );

      expect(screen.getByText('This should always be visible when no auth check')).toBeInTheDocument();
    });

    it('combines lang and loggedIn conditions correctly', () => {
      render(
        <UserContext.Provider value={{ sessionState: { signedIn: true }, apps: [] }}>
          <div>
            <If lang="javascript" loggedIn={true}>
              Visible for JS + signed in
            </If>
            <If lang="ruby" loggedIn={true}>
              Not visible for Ruby + signed in
            </If>
            <If lang="javascript" loggedIn={false}>
              Not visible for JS + signed out
            </If>
          </div>
        </UserContext.Provider>,
      );

      expect(screen.getByText('Visible for JS + signed in')).toBeInTheDocument();
      expect(screen.queryByText('Not visible for Ruby + signed in')).not.toBeInTheDocument();
      expect(screen.queryByText('Not visible for JS + signed out')).not.toBeInTheDocument();
    });
  });

  it('renders code snippets with different languages (JavaScript active)', () => {
    render(
      <div>
        <CodeSnippet lang="javascript">
          <pre>
            <code className="language-javascript">
              {`var ably = new Ably.Realtime('API_KEY');
var channel = ably.channels.get('channel-name');

// Subscribe to messages on channel
channel.subscribe('event', function(message) {
  console.log(message.data);
});`}
            </code>
          </pre>
          <pre>
            <code className="language-swift">
              {`let realtime = ARTRealtime(key: "API_KEY")
let channel = realtime.channels.get("channel-name")

// Subscribe to messages on channel
channel.subscribe("event") { message in
  print(message.data)
}`}
            </code>
          </pre>
        </CodeSnippet>
      </div>,
    );

    const javascriptElement = screen.queryByTestId('code-javascript');
    const swiftElement = screen.queryByTestId('code-swift');

    expect(javascriptElement).toBeInTheDocument();
    expect(swiftElement).not.toBeInTheDocument();
  });

  it('renders code snippets (TypeScript active)', () => {
    render(
      <div>
        <CodeSnippet lang="typescript">
          <pre>
            <code className="language-javascript">
              {`var ably = new Ably.Realtime('API_KEY');
var channel = ably.channels.get('channel-name');

// Subscribe to messages on channel
channel.subscribe('event', function(message) {
  console.log(message.data);
});`}
            </code>
          </pre>
          <pre>
            <code className="language-typescript">
              {`const ably = new Ably.Realtime('API_KEY');
const channel = ably.channels.get('channel-name');

// Subscribe to messages on channel
channel.subscribe('event', (message: Ably.Types.Message) => {
  console.log(message.data);
});`}
            </code>
          </pre>
        </CodeSnippet>
      </div>,
    );

    const javascriptElement = screen.queryByTestId('code-javascript');
    const typescriptElement = screen.queryByTestId('code-typescript');

    expect(javascriptElement).not.toBeInTheDocument();
    expect(typescriptElement).toBeInTheDocument();
  });
});

describe('MDXWrapper structured data', () => {
  const defaultPageContext = {
    frontmatter: {
      title: 'Test Page',
      meta_description: 'Test description',
    },
    languages: [],
    layout: { mdx: true, leftSidebar: true, rightSidebar: true, searchBar: true, template: 'docs' },
  };

  const defaultLocation = {
    pathname: '/docs/test-page',
  } as WindowLocation;

  beforeEach(() => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        product: 'pubsub',
        language: 'javascript',
        languages: [],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not generate structured data when only one language is present', () => {
    render(
      <UserContext.Provider value={{ sessionState: { signedIn: false }, apps: [] }}>
        <MDXWrapper pageContext={defaultPageContext} location={defaultLocation}>
          <div>Test content</div>
        </MDXWrapper>
      </UserContext.Provider>,
    );

    const helmet = Helmet.peek();
    const jsonLdScript = helmet.scriptTags?.find((tag: { type?: string }) => tag.type === 'application/ld+json');

    expect(jsonLdScript).toBeUndefined();
  });

  it('generates TechArticle structured data with multiple languages', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        product: 'pubsub',
        language: 'javascript',
        languages: ['javascript', 'python'],
      },
    });

    render(
      <UserContext.Provider value={{ sessionState: { signedIn: false }, apps: [] }}>
        <MDXWrapper pageContext={defaultPageContext} location={defaultLocation}>
          <div>Test content</div>
        </MDXWrapper>
      </UserContext.Provider>,
    );

    const helmet = Helmet.peek();
    const jsonLdScript = helmet.scriptTags?.find((tag: { type?: string }) => tag.type === 'application/ld+json');

    expect(jsonLdScript).toBeDefined();
    expect(jsonLdScript?.type).toBe('application/ld+json');

    const structuredData = JSON.parse(jsonLdScript?.innerHTML || '{}');
    expect(structuredData['@type']).toBe('TechArticle');
    expect(structuredData.hasPart).toHaveLength(2);
    expect(structuredData.hasPart[0]['@type']).toBe('SoftwareSourceCode');
    expect(structuredData.hasPart[0].programmingLanguage).toBe('JavaScript');
    expect(structuredData.hasPart[1].programmingLanguage).toBe('Python');
    expect(structuredData.hasPart[0].url).toBe('https://example.com/docs/test-page?lang=javascript');
    expect(structuredData.hasPart[1].url).toBe('https://example.com/docs/test-page?lang=python');
  });
});
