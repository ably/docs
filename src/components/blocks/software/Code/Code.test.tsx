import React from 'react';
import { render } from '@testing-library/react';
import Code from '.';

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
  it('Renders Code elements without language', () => {
    const { container } = render(<Code {...shProps} attribs={{ lang: undefined }} />);
    expect(container.firstChild?.firstChild).toBeVisible();
  });
});
