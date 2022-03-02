import React from 'react';
import TestRenderer from 'react-test-renderer';
import CopyLink from './CopyLink';

const rootElement = (
  <CopyLink>
    <h1>Inner content</h1>
  </CopyLink>
);

const copyLinkRenderer = TestRenderer.create(rootElement);

describe('LocalLanguageAlternatives displays statically as expected', () => {
  it('Snapshot of LocalLanguageAlternatives is the same', () => {
    expect(copyLinkRenderer.toJSON()).toMatchSnapshot();
  });
});
