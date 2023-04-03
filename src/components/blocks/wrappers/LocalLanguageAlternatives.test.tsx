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
  localChangeOnly: false,
  isSDKInterface: false,
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
};

describe('<LocalLanguageAlternatives />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LocalLanguageAlternatives selectedPageLanguage="javascript" selectedSDKInterfaceTab="realtime" {...props} />,
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it("doesn't render the menu bar when only one language", () => {
    render(
      <LocalLanguageAlternatives
        selectedPageLanguage="javascript"
        selectedSDKInterfaceTab="realtime"
        {...props}
        languages={['javascript', '']}
      />,
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders when we have multiple languages and selectedPageLanguage is present', () => {
    render(
      <LocalLanguageAlternatives
        {...props}
        languages={['javascript', 'nodejs', 'java', 'ruby', 'swift', 'csharp', 'objc', 'flutter', 'go']}
        selectedSDKInterfaceTab="rest"
        selectedPageLanguage="javascript"
      />,
    );
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('renders when we have SDK multiple languages and selectedPageLanguage is an SDK Interface language', () => {
    render(
      <LocalLanguageAlternatives
        {...props}
        languages={['javascript', 'nodejs', 'java', 'ruby', 'swift', 'csharp', 'objc', 'flutter', 'go']}
        selectedSDKInterfaceTab="rest"
        selectedPageLanguage="rest_javascript"
      />,
    );
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('doesnt renders when  selectedPageLanguage is not present in the languages', () => {
    render(
      <LocalLanguageAlternatives
        {...props}
        languages={['javascript', 'nodejs', 'java', 'ruby', 'swift', 'csharp', 'objc', 'flutter', 'go']}
        selectedSDKInterfaceTab="realtime"
        selectedPageLanguage="php"
      />,
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
