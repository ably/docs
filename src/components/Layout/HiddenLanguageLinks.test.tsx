import React from 'react';
import { render } from '@testing-library/react';
import { useLocation } from '@reach/router';
import HiddenLanguageLinks from './HiddenLanguageLinks';
import { useLayoutContext } from 'src/contexts/layout-context';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn(),
}));

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

const mockUseLayoutContext = useLayoutContext as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

describe('HiddenLanguageLinks', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue({
      pathname: '/docs/channels',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when there is only one language', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        product: 'pubsub',
        languages: ['javascript'],
      },
    });

    const { container } = render(<HiddenLanguageLinks />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when there are no languages', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        product: 'pubsub',
        languages: [],
      },
    });

    const { container } = render(<HiddenLanguageLinks />);
    expect(container.firstChild).toBeNull();
  });

  it('renders links with correct hrefs for each language when > 1 language is available', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        product: 'pubsub',
        languages: ['javascript', 'python', 'flutter'],
      },
    });

    const { container } = render(<HiddenLanguageLinks />);

    const links = Array.from(container.querySelectorAll('a'));
    expect(links).toHaveLength(3);

    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('/docs/channels?lang=javascript');
    expect(hrefs).toContain('/docs/channels?lang=python');
    expect(hrefs).toContain('/docs/channels?lang=flutter');
  });
});
