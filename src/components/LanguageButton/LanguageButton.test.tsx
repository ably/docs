import React from 'react';
import { render, screen } from '@testing-library/react';
import { LayoutProvider } from 'src/contexts/layout-context';

import LanguageButton from './LanguageButton';

jest.mock('@reach/router', () => ({
  useLocation: () => ({
    pathname: '/test-path',
    search: '?lang=javascript',
  }),
}));

describe(`<LanguageButton />`, () => {
  it('renders default state button', () => {
    render(
      <LanguageButton language="javascript" selectedSDKInterfaceTab="realtime" selectedLocalLanguage="javascript" />,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button ui-text-label3 isActive"
      >
        JavaScript
      </button>
    `);
  });
  it('renders active state button', () => {
    render(
      <LayoutProvider>
        <LanguageButton language="javascript" selectedSDKInterfaceTab="realtime" selectedLocalLanguage="javascript" />
      </LayoutProvider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button ui-text-label3 isActive"
      >
        JavaScript
      </button>
    `);
  });

  it('renders active button if pageLanguage is not in the languages but the language is the first language of the array', () => {
    render(
      <LayoutProvider>
        <LanguageButton language="ruby" selectedSDKInterfaceTab="realtime" selectedLocalLanguage="ruby" />
      </LayoutProvider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button ui-text-label3"
      >
        Ruby
      </button>
    `);
  });

  it('renders active button if language is a sdk interface', () => {
    render(
      <LayoutProvider>
        <LanguageButton language="rest_java" selectedSDKInterfaceTab="rest" selectedLocalLanguage="java" />
      </LayoutProvider>,
    );
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button ui-text-label3"
      />
    `);
  });
});
