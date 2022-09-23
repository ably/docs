import React from 'react';
import TestRenderer from 'react-test-renderer';
import CopyLink from './CopyLink';

const rootElement = (
  <CopyLink>
    <h1>Inner content</h1>
  </CopyLink>
);

const rootElementWithId = (
  <CopyLink attribs={{ id: 'example-id' }}>
    <h1 attribs={{ id: 'example-id' }}>Inner content</h1>
  </CopyLink>
);

const copyLinkRenderer = TestRenderer.create(rootElement);
const copyLinkIdRenderer = TestRenderer.create(rootElementWithId);

describe('CopyLink displays statically as expected', () => {
  it('Snapshot of CopyLink is the same', () => {
    expect(copyLinkRenderer.toJSON()).toMatchSnapshot();
  });
  it('Snapshot of CopyLink with ID is the same', () => {
    expect(copyLinkIdRenderer.toJSON()).toMatchSnapshot();
  });
});
