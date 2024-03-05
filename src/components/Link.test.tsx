import React from 'react';
import { withPrefix } from 'gatsby';
import { render } from '@testing-library/react';
import Link from 'src/components/Link';

describe('<Link/>', () => {
  it('uses an anchor tag for anchor-only links', () => {
    const { getByTestId } = render(
      <Link to="#header" className="a-link">
        Go to header
      </Link>,
    );
    const a = getByTestId('link-external');

    expect(a).toHaveAttribute('href', '#header');
    expect(a).toHaveAttribute('class', 'a-link');
    expect(a).toHaveTextContent('Go to header');
  });

  it('uses an anchor tag for external anchor links', () => {
    const { getByTestId } = render(
      <Link to="https://github.com/ably/ably-js#README" className="a-link">
        README
      </Link>,
    );
    const a = getByTestId('link-external');

    expect(a).toHaveTextContent('README');
  });

  it('uses an anchor tag when external prop is passed', () => {
    const { getByTestId } = render(
      <Link to="/login" external={true}>
        Login
      </Link>,
    );
    const a = getByTestId('link-external');

    expect(a).toHaveAttribute('href', '/login');
    expect(a).toHaveTextContent('Login');
  });

  it('uses an anchor tag for links with protocols', () => {
    const { queryAllByTestId } = render(
      <>
        <Link to="https://faqs.ably.com">FAQs</Link>
        <Link to="http://example.com">Example</Link>
      </>,
    );
    const a = queryAllByTestId('link-external');

    expect(a).toHaveLength(2);
  });

  it('handles links with missing `to` props', () => {
    const { getByTestId } = render(<Link id="some-anchor">I have questions</Link>);
    const a = getByTestId('link-external');

    expect(a).not.toHaveAttribute('href');
    expect(a).toHaveAttribute('id', 'some-anchor');
    expect(a).toHaveTextContent('I have questions');
  });

  /**
   * The test below depend on the value of __PATH_PREFIX__ being set to '/docs'
   * See jest.conf.js
   */
  it('uses a Gatsby Link for internal links', () => {
    expect(__PATH_PREFIX__).toBe('/docs');

    const { getByTestId } = render(
      <Link to="/spaces" className="a-link">
        Spaces
      </Link>,
    );
    const a = getByTestId('link-internal');

    expect(a).toHaveAttribute('href', withPrefix('/spaces'));
    expect(a).toHaveAttribute('class', 'a-link');
    expect(a).toHaveTextContent('Spaces');
  });

  it('uses a Gatsby Link for absolute internal links', () => {
    expect(__PATH_PREFIX__).toBe('/docs');

    const { getByTestId } = render(<Link to="https://ably.com/docs/old-page">Old link</Link>);
    const a = getByTestId('link-internal');

    expect(a).toHaveAttribute('href', withPrefix('/old-page'));
    expect(a).toHaveTextContent('Old link');
  });

  it('drop noreferrer from internal links', () => {
    const { getByText } = render(
      <>
        <Link to="/simple" rel="noreferrer">
          Simple
        </Link>
        <Link to="/complicated" rel="noreferrer noopener">
          Complicated
        </Link>
      </>,
    );

    const simple = getByText('Simple');
    expect(simple).not.toHaveAttribute('rel');

    const complicated = getByText('Complicated');
    expect(complicated).toHaveAttribute('rel', 'noopener');
  });

  it('adds noreferrer to external links in new windows', () => {
    const { getByText } = render(
      <>
        <Link to="https://example.com" target="_blank">
          Simple
        </Link>
        <Link to="https://example.com" target="_blank" rel="noopener">
          Complicated
        </Link>
      </>,
    );

    const simple = getByText('Simple');
    expect(simple).toHaveAttribute('rel', 'noreferrer noopener');

    const complicated = getByText('Complicated');
    expect(complicated).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
