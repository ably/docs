import React from 'react';
import { useStaticQuery } from 'gatsby';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DisplayMode, SearchBar } from '.';

describe('<SearchBar />', () => {
  const externalScriptsData = {
    addsearchSiteKey: 'shh-do-not-tell-to-anyone',
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

  it('should render the component', () => {
    render(<SearchBar displayMode={DisplayMode.FULL_SCREEN} />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('should focus on search on Meta + K keyboard shortcut', async () => {
    const user = userEvent.setup();
    render(<SearchBar displayMode={DisplayMode.FULL_SCREEN} />);
    await user.keyboard('{Meta>}K{/Meta}');
    expect(document.activeElement).toEqual(screen.getByPlaceholderText('Search'));
  });

  it('should open search box on typing in search input and close on click outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <SearchBar displayMode={DisplayMode.FULL_SCREEN} />
        <div>click me</div>
      </div>,
    );

    const searchInput = screen.getByPlaceholderText('Search');

    await user.type(searchInput, 'test');
    expect(screen.getByLabelText('suggestions')).toBeInTheDocument();

    await user.click(screen.getByText('click me'));
    expect(screen.queryByLabelText('suggestions')).not.toBeInTheDocument();
  });

  describe('when Inkeep is enabled', () => {
    beforeEach(() => {
      externalScriptsData.inkeepEnabled = true;
    });

    it('should render the component', () => {
      render(<SearchBar displayMode={DisplayMode.FULL_SCREEN} />);
      expect(document.querySelector('#inkeep-search')).toBeInTheDocument();
    });
  });
});
