import { renderHook } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import { useSiteMetadata } from './use-site-metadata';

describe('useSiteMedata', () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          siteUrl: 'http://example.com',
        },
      },
    });
  });

  it('contains the siteMetadata', () => {
    const { result } = renderHook(() => useSiteMetadata());

    expect(result.current.siteUrl).toBe('http://example.com');
  });

  it('contains a canonicalUrl helper', () => {
    const { result } = renderHook(() => useSiteMetadata());
    const {
      current: { canonicalUrl },
    } = result;

    const url = canonicalUrl('/docs/my-page');
    expect(url).toBe('http://example.com/docs/my-page');
  });
});
