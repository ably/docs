import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks/dom';

import useSearch from './use-search';

describe('useSearch', () => {
  describe('setup', () => {
    it('sets up the API client', () => {
      const { result } = renderHook(() =>
        useSearch({
          addsearchApiKey: 'key',
        }),
      );

      expect(result.current.state.client).not.toBeNull();
    });

    it('fails silently if api key is missing', () => {
      const { result } = renderHook(() => useSearch({}));

      expect(result.current.state.client).toBeNull();
    });
  });

  describe('enableParamsSync', () => {
    afterEach(() => {
      const url = new URL(window.location.href);
      window.history.replaceState({}, '', url);
    });

    it('sets state from the URL', async () => {
      const url = new URL(`${window.location.href}search?q=kafka&page=2`);
      window.history.replaceState({}, '', url);

      const { result } = await waitFor(() =>
        renderHook(() =>
          useSearch({
            addsearchApiKey: 'key',
            enableParamsSync: true,
          }),
        ),
      );

      expect(result.current.state.query).toBe('kafka');
      expect(result.current.state.page).toBe(2);
    });
  });

  describe('search', () => {
    it('calls search', () => {
      const { result } = renderHook(() =>
        useSearch({
          addsearchApiKey: 'key',
        }),
      );

      const searchMock = jest.fn();
      jest.spyOn(result.current.state.client, 'search').mockImplementation(searchMock);

      act(() => {
        result.current.actions.search({ query: 'kafka', page: 2 });
      });

      expect(result.current.state.query).toBe('kafka');
      expect(result.current.state.page).toBe(2);
      expect(searchMock).toHaveBeenCalled();
    });

    it('resets state if query is deleted', () => {
      const { result } = renderHook(() =>
        useSearch({
          addsearchApiKey: 'key',
        }),
      );

      const searchMock = jest.fn();
      jest.spyOn(result.current.state.client, 'search').mockImplementation(searchMock);

      act(() => {
        result.current.actions.search({ query: 'kafka', page: 2 });
      });

      expect(result.current.state.query).toBe('kafka');
      expect(result.current.state.page).toBe(2);
      expect(searchMock).toHaveBeenCalled();
      searchMock.mockClear();

      act(() => {
        result.current.actions.search({ query: '' });
      });

      expect(result.current.state.query).toBe('');
      expect(result.current.state.page).toBe(1);
      expect(searchMock).not.toHaveBeenCalled();
    });

    it('sets loading state', () => {
      const { result } = renderHook(() =>
        useSearch({
          addsearchApiKey: 'key',
        }),
      );

      const searchMock = jest.fn();
      jest.spyOn(result.current.state.client, 'search').mockImplementation(searchMock);

      expect(result.current.state.loading).toBe(false);

      act(() => {
        result.current.actions.search({ query: 'kafka' });
      });

      expect(result.current.state.loading).toBe(true);
    });

    it('sets error if api returns error', () => {
      const { result } = renderHook(() =>
        useSearch({
          addsearchApiKey: 'key',
        }),
      );

      const searchMock = jest.fn((_, cb) => cb({ error: { message: 'Error' } }));
      jest.spyOn(result.current.state.client, 'search').mockImplementation(searchMock);

      act(() => {
        result.current.actions.search({ query: 'kafka' });
      });

      expect(result.current.state.loading).toBe(false);
      expect(result.current.state.error).toEqual({ message: 'Error' });
      expect(result.current.state.totalHits).toBe(0);
      expect(result.current.state.results).toBeNull();
    });

    it('sets results if api returns results', () => {
      const { result } = renderHook(() =>
        useSearch({
          addsearchApiKey: 'key',
        }),
      );

      const searchMock = jest.fn((_, cb) => cb({ hits: [{ id: 1 }], total_hits: 1 }));
      jest.spyOn(result.current.state.client, 'search').mockImplementation(searchMock);

      act(() => {
        result.current.actions.search({ query: 'kafka' });
      });

      expect(result.current.state.loading).toBe(false);
      expect(result.current.state.error).toBeNull();
      expect(result.current.state.totalHits).toBe(1);
      expect(result.current.state.results).toEqual([{ id: 1 }]);
    });

    it('sets error if api returns netiher error or hits', () => {
      const { result } = renderHook(() =>
        useSearch({
          addsearchApiKey: 'key',
        }),
      );

      const searchMock = jest.fn((_, cb) => cb({}));
      jest.spyOn(result.current.state.client, 'search').mockImplementation(searchMock);

      act(() => {
        result.current.actions.search({ query: 'kafka' });
      });

      expect(result.current.state.loading).toBe(false);
      expect(result.current.state.error).toEqual({ message: 'Invalid API response.' });
      expect(result.current.state.totalHits).toBe(0);
      expect(result.current.state.results).toBeNull();
    });
  });
});
