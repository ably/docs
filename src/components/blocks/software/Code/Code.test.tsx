import React from 'react';
import { render, screen } from '@testing-library/react';
import Code from '.';

const rubyProps = {
  data: [
    {
      data: "channel = ably.channels.get('quickstart')\nchannel.publish 'greeting', 'hello!'",
      name: 'text',
      type: 'text',
    },
  ],
  attribs: { lang: 'ruby' },
};

const shProps = {
  data: [
    {
      data: `curl https://rest.ably.io/channels/{{RANDOM_CHANNEL_NAME}}/publish \\\n  --user "{{API_KEY}}" \\\n  --data "name=greeting&data=Hello"`,
      name: 'text',
      type: 'text',
    },
  ],
  attribs: { lang: 'sh' },
};

describe('<Code />', () => {
  it('Renders Code elements with language', () => {
    const { container } = render(<Code {...rubyProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Renders Code elements without language', () => {
    const { container } = render(<Code {...shProps} attribs={{ lang: undefined }} />);
    expect(container.firstChild?.firstChild).toHaveClass('language-plaintext');
  });

  it('Updates the codeblock when language is switched', () => {
    const { rerender } = render(<Code {...rubyProps} />);

    expect(screen.getByTestId('code-block')).toMatchSnapshot();

    rerender(<Code {...shProps} />);
    expect(screen.getByTestId('code-block')).toMatchSnapshot();
  });
});
