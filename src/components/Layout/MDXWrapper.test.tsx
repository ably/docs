import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import If from './mdx/If';
import CodeSnippet from '@ably/ui/core/CodeSnippet';

// Mock the dependencies we need for testing
jest.mock('./MDXWrapper', () => {
  return {
    __esModule: true,
    default: ({ children, pageContext }: { children: ReactNode; pageContext: any }) => (
      <div data-testid="mdx-wrapper">
        {pageContext?.frontmatter?.title && <h1>{pageContext.frontmatter.title}</h1>}
        <div data-testid="mdx-content">{children}</div>
      </div>
    ),
  };
});

// Mock the layout context
jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: () => ({
    activePage: { language: 'javascript' },
  }),
  LayoutProvider: ({ children }: { children: ReactNode }) => <div data-testid="layout-provider">{children}</div>,
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

  it('renders code snippets with different languages (JavaScript active)', () => {
    render(
      <div>
        <CodeSnippet>
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
