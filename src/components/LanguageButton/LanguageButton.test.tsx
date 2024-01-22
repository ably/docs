import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PREFERRED_LANGUAGE_KEY } from 'src/utilities/language/constants';
import PageLanguageContext from 'src/contexts/page-language-context';

import LanguageButton from './LanguageButton';
import { safeWindow } from 'src/utilities';

describe(`<LanguageButton />`, () => {
  it('renders default state button', () => {
    render(
      <LanguageButton language="javascript" selectedSDKInterfaceTab="realtime" selectedLocalLanguage="javascript" />,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button isActive"
      >
        JavaScript
      </button>
    `);
  });
  it('renders active state button', () => {
    render(
      <PageLanguageContext.Provider value="javascript">
        <LanguageButton language="javascript" selectedSDKInterfaceTab="realtime" selectedLocalLanguage="javascript" />
      </PageLanguageContext.Provider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button isActive"
      >
        JavaScript
      </button>
    `);
  });

  it('changes session storage value on click', async () => {
    render(
      <PageLanguageContext.Provider value="python">
        <LanguageButton selectedSDKInterfaceTab="realtime" language="javascript" selectedLocalLanguage="javascript" />
      </PageLanguageContext.Provider>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(safeWindow.sessionStorage.getItem(PREFERRED_LANGUAGE_KEY)).toBe('javascript');
  });

  it('renders active button if pageLanguage is not in the languages but the language is the first language of the array', () => {
    render(
      <PageLanguageContext.Provider value="php">
        <LanguageButton language="ruby" selectedSDKInterfaceTab="realtime" selectedLocalLanguage="ruby" />
      </PageLanguageContext.Provider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button isActive"
      >
        Ruby
      </button>
    `);
  });

  it('renders active button if language is a sdk interface', () => {
    render(
      <PageLanguageContext.Provider value="java">
        <LanguageButton language="rest_java" selectedSDKInterfaceTab="rest" selectedLocalLanguage="java" />
      </PageLanguageContext.Provider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button isActive"
      >
        Java
      </button>
    `);
  });
});
