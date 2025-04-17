import React from 'react';
import { render } from '@testing-library/react';
import { DlWrapper } from 'src/components/blocks/list/Dl/DlWrapper';
import { LayoutProvider } from 'src/contexts/layout-context';

import Html from './';
import { dtFixture } from './fixtures';

jest.mock('@reach/router', () => ({
  useLocation: () => ({
    pathname: '/test-path',
    search: '?lang=python',
  }),
}));

describe('<Html />', () => {
  it('renders correct Dl based on PageLanguageContext value', () => {
    const { container } = render(
      <LayoutProvider>
        <Html data={dtFixture} BlockWrapper={DlWrapper} />
      </LayoutProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
