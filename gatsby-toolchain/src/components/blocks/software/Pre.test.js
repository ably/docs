import React from 'react';
import { Pre } from '.';
import TestRenderer from 'react-test-renderer';

const preRootElement = (
  <Pre
    data={[{ data: 'var useVars = false;', type: 'text' }]}
    language="javascript"
    languages={['javascript', 'csharp']}
    altData={{
      javascript: [{ data: 'var useVars = false;', type: 'text' }],
      csharp: [{ data: 'bool useVars = false;', type: 'text' }],
    }}
  />
);

describe('Different langs provided to Code elements results in different rendering', () => {
  const preRootElementRenderer = TestRenderer.create(preRootElement);
  const preJSON = preRootElementRenderer.toJSON();
  it('Successfully renders Code elements with language', () => {
    expect(preJSON).toMatchSnapshot();
  });
});
