import React from 'react';
import { render } from '@testing-library/react';
import { DlWrapper } from 'src/components/blocks/list/Dl/DlWrapper';
import { PageLanguageContext } from 'src/contexts';

import Html from './';
import { dtFixture } from './fixtures';

describe('<Html />', () => {
  it('renders correct Dl based on PageLanguageContext value', () => {
    const { container } = render(
      <PageLanguageContext.Provider value="python">
        <Html data={dtFixture} BlockWrapper={DlWrapper} />
      </PageLanguageContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
