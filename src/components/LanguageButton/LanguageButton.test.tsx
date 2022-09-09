import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PREFERRED_LANGUAGE_KEY } from 'src/utilities/language/constants';
import PageLanguageContext from 'src/contexts/page-language-context';

import LanguageButton from './LanguageButton';
import { storage } from 'src/utilities/browser/storage';

describe(`<LanguageButton />`, () => {
  it('renders default state button', () => {
    render(<LanguageButton language="javascript" />);
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button"
      >
        JS
      </button>
    `);
  });
  it('renders active state button', () => {
    render(
      <PageLanguageContext.Provider value="javascript">
        <LanguageButton language="javascript" />
      </PageLanguageContext.Provider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button isActive"
      >
        JS
      </button>
    `);
  });

  it('changes localstorage value on click', async () => {
    render(
      <PageLanguageContext.Provider value="python">
        <LanguageButton language="javascript" />
      </PageLanguageContext.Provider>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(storage.getItem(PREFERRED_LANGUAGE_KEY)).toBe('javascript');
  });
});
