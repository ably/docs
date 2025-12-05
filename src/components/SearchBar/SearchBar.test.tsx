import React from 'react';
import { useStaticQuery } from 'gatsby';
import { render } from '@testing-library/react';
import { DisplayMode, SearchBar } from '.';

describe('<SearchBar />', () => {
  const externalScriptsData = {
    inkeepChatEnabled: false,
    inkeepSearchEnabled: false,
  };

  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          externalScriptsData,
        },
      },
    });
  });

  it('should not render search when Inkeep is disabled', () => {
    const { container } = render(<SearchBar displayMode={DisplayMode.FULL_SCREEN} />);
    expect(container.querySelector('#inkeep-search')).not.toBeInTheDocument();
  });

  describe('when Inkeep search is enabled', () => {
    beforeEach(() => {
      externalScriptsData.inkeepSearchEnabled = true;
    });

    it('should render the Inkeep search component', () => {
      render(<SearchBar displayMode={DisplayMode.FULL_SCREEN} />);
      expect(document.querySelector('#inkeep-search')).toBeInTheDocument();
    });
  });
});
