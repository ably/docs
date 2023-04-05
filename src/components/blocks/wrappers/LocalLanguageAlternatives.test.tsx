import React from 'react';
import { render, screen } from '@testing-library/react';
import LocalLanguageAlternatives from './LocalLanguageAlternatives';

const props = {
  data: {
    javascript: [
      {
        data: [
          {
            data: 'This is JavaScript.',
            type: 'text',
            name: 'text',
          },
        ],
        type: 'tag',
        name: 'code',
        attribs: {
          lang: 'javascript',
        },
      },
    ],
    ruby: [
      {
        data: [
          {
            data: 'This is Ruby.',
            type: 'text',
            name: 'text',
          },
        ],
        type: 'tag',
        name: 'code',
        attribs: {
          lang: 'ruby',
        },
      },
    ],
    csharp: [
      {
        data: [
          {
            data: 'This is C#.',
            type: 'text',
            name: 'text',
          },
        ],
        type: 'tag',
        name: 'code',
        attribs: {
          lang: 'csharp',
        },
      },
    ],
  },
  languages: ['javascript', 'ruby', 'csharp'],
  initialData: [
    {
      data: [{ data: "await ably.close()\nprint('Closed the connection to Ably.')", type: 'text', name: 'text' }],
      type: 'tag',
      name: 'code',
      attribs: { lang: 'python' },
    },
  ],
  setSelectedSDKInterfaceTab: () => {
    throw new Error('Function not implemented.');
  },
  setPreviousSDKInterfaceTab: () => {
    throw new Error('Function not implemented.');
  },
  selectedSDKInterfaceTab: 'realtime',
  isSDKInterface: false,
};

const TEST_SDK_INTERFACE_DATA = {
  data: [
    {
      data: 'This is SDK Interface',
      type: 'text',
      name: 'text',
    },
  ],
  type: 'tag',
  name: 'code',
};
describe('<LocalLanguageAlternatives />', () => {
  it('renders correctly', () => {
    const { container } = render(<LocalLanguageAlternatives selectedPageLanguage="javascript" {...props} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it("doesn't render the menu bar when only one language", () => {
    render(<LocalLanguageAlternatives selectedPageLanguage="javascript" {...props} languages={['javascript', '']} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders when we have multiple languages and selected PageLanguage is present', () => {
    render(
      <LocalLanguageAlternatives
        {...props}
        languages={['javascript', 'nodejs', 'java', 'ruby', 'swift', 'csharp', 'objc', 'flutter', 'go']}
        selectedPageLanguage="javascript"
      />,
    );
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('doesnt renders when  selected PageLanguage is not present in the languages', () => {
    render(
      <LocalLanguageAlternatives
        {...props}
        languages={['javascript', 'nodejs', 'java', 'ruby', 'swift', 'csharp', 'objc', 'flutter', 'go']}
        selectedPageLanguage="php"
      />,
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders the menu bar with SDK Interface tab when both Rest and Realtime languages  are present', () => {
    render(
      <LocalLanguageAlternatives
        {...props}
        isSDKInterface={true}
        languages={['realtime_javascript', 'realtime_java', 'javascript']}
        selectedPageLanguage="javascript"
        data={{
          realtime_javascript: [
            {
              ...TEST_SDK_INTERFACE_DATA,
              attribs: {
                lang: 'realtime_javascript',
              },
            },
          ],
          realtime_java: [
            {
              ...TEST_SDK_INTERFACE_DATA,
              attribs: {
                lang: 'realtime_javascript',
              },
            },
          ],
          rest_javascript: [
            {
              ...TEST_SDK_INTERFACE_DATA,
              attribs: {
                lang: 'rest_javascript',
              },
            },
          ],
        }}
      />,
    );
    expect(screen.getByTestId('menuSDKInterface')).toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('renders menu with SDK Interface tab when we have 1 Rest languages only', () => {
    render(
      <LocalLanguageAlternatives
        {...props}
        data={{
          rest_javascript: [
            {
              ...TEST_SDK_INTERFACE_DATA,
              attribs: {
                lang: 'rest_javascript',
              },
            },
          ],
          rest_ruby: [
            {
              ...TEST_SDK_INTERFACE_DATA,
              attribs: {
                lang: 'rest_ruby',
              },
            },
          ],
        }}
        isSDKInterface={true}
        languages={['rest_javascript', 'rest_ruby']}
        selectedSDKInterfaceTab="rest"
        selectedPageLanguage="javascript"
      />,
    );
    expect(screen.getByTestId('menuSDKInterface')).toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it("doesn't render the menu bar but renders the SDK Interface tab when only have Realtime languages", () => {
    render(
      <LocalLanguageAlternatives
        selectedPageLanguage="javascript"
        {...props}
        isSDKInterface={true}
        data={{
          realtime_javascript: [
            {
              ...TEST_SDK_INTERFACE_DATA,
              attribs: {
                lang: 'realtime_javascript',
              },
            },
          ],
        }}
        languages={['realtime_javascript']}
      />,
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByTestId('menuSDKInterface')).toBeInTheDocument();
  });
});
