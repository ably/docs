import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PageLanguageContext } from 'src/contexts/page-language-context';
import LanguageButton from './LanguageButton';

const contextValue = {
  handleCurrentLanguageChange: jest.fn(),
  getPreferredLanguage: jest.fn(),
  setPreferredLanguage: jest.fn(),
};

describe(`<LanguageButton />`, () => {
  it('renders default state button', () => {
    render(
      <LanguageButton language="javascript" selectedSDKInterfaceTab="realtime" selectedLocalLanguage="javascript" />,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button ui-text-menu3 isActive"
      >
        JavaScript
      </button>
    `);
  });
  it('renders active state button', () => {
    render(
      <PageLanguageContext.Provider value={{ currentLanguage: 'javascript', ...contextValue }}>
        <LanguageButton language="javascript" selectedSDKInterfaceTab="realtime" selectedLocalLanguage="javascript" />
      </PageLanguageContext.Provider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button ui-text-menu3 isActive"
      >
        JavaScript
      </button>
    `);
  });

  it('changes session storage value on click', async () => {
    const setItemSpy = jest.spyOn(contextValue, 'setPreferredLanguage');
    render(
      <PageLanguageContext.Provider value={{ currentLanguage: 'python', ...contextValue }}>
        <LanguageButton selectedSDKInterfaceTab="realtime" language="javascript" selectedLocalLanguage="javascript" />
      </PageLanguageContext.Provider>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(setItemSpy).toHaveBeenCalledWith('javascript');
  });

  it('renders active button if pageLanguage is not in the languages but the language is the first language of the array', () => {
    render(
      <PageLanguageContext.Provider value={{ currentLanguage: 'php', ...contextValue }}>
        <LanguageButton language="ruby" selectedSDKInterfaceTab="realtime" selectedLocalLanguage="ruby" />
      </PageLanguageContext.Provider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button ui-text-menu3 isActive"
      >
        Ruby
      </button>
    `);
  });

  it('renders active button if language is a sdk interface', () => {
    render(
      <PageLanguageContext.Provider value={{ currentLanguage: 'java', ...contextValue }}>
        <LanguageButton language="rest_java" selectedSDKInterfaceTab="rest" selectedLocalLanguage="java" />
      </PageLanguageContext.Provider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button ui-text-menu3 isActive"
      >
        Java
      </button>
    `);
  });
});
