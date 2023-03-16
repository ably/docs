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
  initialData: [
    {
      data: [{ data: "await ably.close()\nprint('Closed the connection to Ably.')", type: 'text', name: 'text' }],
      type: 'tag',
      name: 'code',
      attribs: { lang: 'python' },
    },
  ],
};

describe('<LocalLanguageAlternatives />', () => {
  it('renders correctly', () => {
    const { container } = render(<LocalLanguageAlternatives {...props} />);
    expect(container).toMatchSnapshot();
    // expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it("doesn't render the menu bar when only one language", () => {
    render(<LocalLanguageAlternatives {...props} languages={['javascript', '']} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
