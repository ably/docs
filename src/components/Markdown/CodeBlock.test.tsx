import React from 'react';
import { render } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';

jest.mock('@ably/ui/core/Icon', () => {
  return function MockIcon() {
    return <span data-testid="mock-icon" />;
  };
});

jest.mock('src/components/ButtonWithTooltip', () => ({
  ButtonWithTooltip: ({ children }: any) => <button>{children}</button>,
}));

jest.mock('src/external-scripts/google-tag-manager/events', () => ({
  copyCodeBlockContentTracker: jest.fn(),
}));

jest.mock('dompurify', () => ({
  sanitize: (html: string) => html,
}));

const mockHighlightSnippet = jest.fn();
const mockParseLineHighlights = jest.fn();
const mockSplitHtmlLines = jest.fn();

jest.mock('@ably/ui/core/utils/syntax-highlighter', () => ({
  highlightSnippet: (...args: any[]) => mockHighlightSnippet(...args),
  LINE_HIGHLIGHT_CLASSES: {
    addition: 'code-line-addition',
    removal: 'code-line-removal',
    highlight: 'code-line-highlight',
  },
  parseLineHighlights: (...args: any[]) => mockParseLineHighlights(...args),
  splitHtmlLines: (...args: any[]) => mockSplitHtmlLines(...args),
  registerDefaultLanguages: jest.fn(),
}));

jest.mock('@ably/ui/core/utils/syntax-highlighter-registry', () => ({
  __esModule: true,
  default: [],
}));

const buildCodeChild = (code: string, language: string, meta?: string) => {
  const codeProps: Record<string, any> = {
    className: `language-${language}`,
    children: code,
  };
  if (meta) {
    codeProps['data-meta'] = meta;
  }
  return <code {...codeProps} />;
};

describe('<CodeBlock />', () => {
  beforeEach(() => {
    mockHighlightSnippet.mockReset();
    mockParseLineHighlights.mockReset();
    mockSplitHtmlLines.mockReset();
    mockHighlightSnippet.mockReturnValue('<span>highlighted</span>');
    mockSplitHtmlLines.mockReturnValue(['<span>highlighted</span>']);
  });

  it('renders a single <code> element and skips splitHtmlLines when no highlights', () => {
    mockParseLineHighlights.mockReturnValue({ lang: 'javascript', highlights: {} });

    const { container } = render(
      <CodeBlock language="javascript">{buildCodeChild('const x = 1;', 'javascript')}</CodeBlock>,
    );

    expect(mockParseLineHighlights).toHaveBeenCalledWith('javascript', undefined);
    expect(mockSplitHtmlLines).not.toHaveBeenCalled();
    expect(container.querySelectorAll('code.ui-text-code')).toHaveLength(1);
    expect(container.querySelector('.code-line-addition')).toBeNull();
    expect(container.querySelector('.code-line-removal')).toBeNull();
    expect(container.querySelector('.code-line-highlight')).toBeNull();
  });

  it('passes data-meta to parseLineHighlights', () => {
    const meta = 'highlight="+1,2,-3"';
    mockParseLineHighlights.mockReturnValue({
      lang: 'javascript',
      highlights: { 1: 'addition', 2: 'highlight', 3: 'removal' },
    });
    mockSplitHtmlLines.mockReturnValue(['<span>line1</span>', '<span>line2</span>', '<span>line3</span>']);

    render(<CodeBlock language="javascript">{buildCodeChild('line1\nline2\nline3', 'javascript', meta)}</CodeBlock>);

    expect(mockParseLineHighlights).toHaveBeenCalledWith('javascript', meta);
  });

  it('renders per-line with highlight classes when highlights are present', () => {
    mockParseLineHighlights.mockReturnValue({
      lang: 'javascript',
      highlights: { 1: 'addition', 2: 'highlight', 3: 'removal' },
    });
    mockSplitHtmlLines.mockReturnValue(['<span>line1</span>', '<span>line2</span>', '<span>line3</span>']);

    const { container } = render(
      <CodeBlock language="javascript">
        {buildCodeChild('line1\nline2\nline3', 'javascript', 'highlight="+1,2,-3"')}
      </CodeBlock>,
    );

    expect(container.querySelector('.code-line-addition')).not.toBeNull();
    expect(container.querySelector('.code-line-highlight')).not.toBeNull();
    expect(container.querySelector('.code-line-removal')).not.toBeNull();

    // Both paths wrap content in a single <code> element
    expect(container.querySelectorAll('code.ui-text-code')).toHaveLength(1);
  });

  it('does not apply highlight classes when no highlights exist', () => {
    mockParseLineHighlights.mockReturnValue({ lang: 'javascript', highlights: {} });

    const { container } = render(
      <CodeBlock language="javascript">{buildCodeChild('const x = 1;', 'javascript')}</CodeBlock>,
    );

    expect(container.querySelector('.code-line-addition')).toBeNull();
    expect(container.querySelector('.code-line-removal')).toBeNull();
    expect(container.querySelector('.code-line-highlight')).toBeNull();
  });

  it('calls highlightSnippet with correct language and content', () => {
    mockParseLineHighlights.mockReturnValue({ lang: 'python', highlights: {} });

    render(<CodeBlock language="python">{buildCodeChild('print("hi")', 'python')}</CodeBlock>);

    expect(mockHighlightSnippet).toHaveBeenCalledWith('python', 'print("hi")');
  });
});
