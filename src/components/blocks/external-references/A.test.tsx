import { render, screen } from '@testing-library/react';
import { A } from '.';
import { useLocation, WindowLocation } from '@reach/router';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

jest.mock('src/components/Link', () => {
  return function MockLink({ to, children, ...props }: any) {
    // Mock the checkLinkIsInternal logic
    const checkLinkIsInternal = (link?: string): boolean => {
      if (!link) {
        return false;
      }

      // Relative links starting with / (but not //)
      if (link.startsWith('/') && !link.startsWith('//')) {
        return true;
      }

      // Ably docs links
      const legacyDocsUrlPattern = /^(https?:\/\/(?:www\.)?ably.com\/docs).*/;
      if (legacyDocsUrlPattern.test(link)) {
        return true;
      }

      return false;
    };

    const isInternal = checkLinkIsInternal(to);
    const testId = isInternal ? 'link-internal' : 'link-external';

    return (
      <a href={to} data-testid={testId} {...props}>
        {children}
      </a>
    );
  };
});

const gatsbyRootElement = {
  data: 'Lorem ipsum',
  attribs: { href: 'https://ably.com/docs/lorem' },
};
const normalRootElement = {
  data: 'Lorem ipsum',
  attribs: { href: 'https://www.example.com' },
};
const linkWithImageElement = {
  data: [
    {
      attribs: {
        alt: 'Presence representation',
        src: '/images/diagrams/Channels-Presence.gif',
      },
      data: [],
      name: 'img',
      type: 'tag',
    },
  ],
  attribs: { href: '/images/diagrams/Channels-Presence.gif', target: '_blank' },
};

const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;

describe('Different data provided to link elements results in different components', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue({
      search: '',
    } as WindowLocation);
  });

  it('Successfully renders Gatsby links', () => {
    render(<A {...gatsbyRootElement} />);

    expect(screen.getByTestId('link-internal')).toBeInTheDocument();
  });

  it('Successfully renders normal links', () => {
    const { container } = render(<A {...normalRootElement} />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <a
        class="ui-link"
        data-testid="link-external"
        href="https://www.example.com"
      >
        Lorem ipsum
      </a>
    `);
  });

  it('Successfully renders image without <a> element', () => {
    render(<A {...linkWithImageElement} />);
    expect(screen.getByAltText('Presence representation')).toBeInTheDocument();
  });
});
