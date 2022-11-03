import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DisplayMode, SearchBar } from '.';
import addsearchMock from '../../../../../__fixtures__/addsearchMock.json';

describe('<SearchBar />', () => {
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

    await user.hover(screen.getAllByRole('link')[0]);
    expect(screen.getByAltText(addsearchMock.hits[0].title)).toBeInTheDocument();

    await user.click(screen.getByText('click me'));
    expect(screen.queryByLabelText('suggestions')).not.toBeInTheDocument();
  });
});
