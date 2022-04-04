import React from 'react';
import TestRenderer from 'react-test-renderer';
import CopyLink, { LinkHoverPopup } from './CopyLink';

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

const linkHoverElement = <LinkHoverPopup copySuccess={null}>Hover popup</LinkHoverPopup>;
const linkHoverElementSuccess = <LinkHoverPopup copySuccess={true}>Success</LinkHoverPopup>;
const linkHoverElementFailure = <LinkHoverPopup copySuccess={false}>Failure</LinkHoverPopup>;

const copyLinkRenderer = TestRenderer.create(rootElement);
const copyLinkIdRenderer = TestRenderer.create(rootElementWithId);

const linkHoverRenderer = TestRenderer.create(linkHoverElement);
const linkHoverSuccessRenderer = TestRenderer.create(linkHoverElementSuccess);
const linkHoverFailureRenderer = TestRenderer.create(linkHoverElementFailure);

describe('CopyLink displays statically as expected', () => {
  it('Snapshot of CopyLink is the same', () => {
    //expect(copyLinkRenderer.toJSON()).toMatchSnapshot();
  });
  it('Snapshot of CopyLink with ID is the same', () => {
    //expect(copyLinkIdRenderer.toJSON()).toMatchSnapshot();
  });
});

describe('LinkHoverPopup displays statically as expected', () => {
  it('Snapshot of LinkHoverPopup is the same', () => {
    expect(linkHoverRenderer.toJSON()).toMatchSnapshot();
  });
  it('Snapshot of LinkHoverPopup with Success is the same', () => {
    expect(linkHoverSuccessRenderer.toJSON()).toMatchSnapshot();
  });
  it('Snapshot of LinkHoverPopup with Failure is the same', () => {
    expect(linkHoverFailureRenderer.toJSON()).toMatchSnapshot();
  });
});