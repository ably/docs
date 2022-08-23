import { useCallback, useEffect, useReducer } from 'react';
// @ts-ignore - addsearch has no types
import AddSearchClient from 'addsearch-js-client';

// NOTE: all the types are documented here https://www.addsearch.com/docs/api/search-results/
type Image = {
  main: string;
  main_b64: string;
  capture: string;
};

type DocumentType = 'html' | 'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx';

type Hit = {
  id: string;
  url: string;
  title: string;
  meta_description: string;
  meta_categories: string[]; // <meta name="addsearch-category" content="features/api" />
  custom_fields: Record<string, string> | Record<string, string[]>;
  highlight: string; // NOTE: comes with html tags like <em>, etc.
  ts: string; // NOTE: essentially an ISO date string
  categories: string[];
  document_type: DocumentType;
  images: Image;
  score: number; // NOTE: a number between 0 and 1
};

type Result = {
  error?: { message: string } | null;
  page: number;
  total_hits: number;
  processing_time_ms: number;
  hits: Hit[];
  facets: null;
  rangeFacets: null;
};

export type State = {
  client: string | null;
  query?: string;
  page: Result['page'];
  totalHits: Result['total_hits'];
  results: Hit[] | null;
  error: Result['error'] | null;
  loading: boolean;
  enableParamsSync?: boolean;
};

type SetupActionPayload = {
  addsearchApiKey: string;
  url?: URL;
};

type SetResultsPayload = {
  loading: boolean;
  error: Result['error'];
  totalHits: Result['total_hits'];
  results: Hit[] | null;
  client?: string;
};

type Action = {
  type: 'setup' | 'set-results' | 'search' | 'set-loading';
  payload?: SetupActionPayload | SetResultsPayload | Pick<State, 'query' | 'page'>;
};

interface UpdateUrlProps {
  query?: string;
  page: Result['page'];
}

const updateUrl = ({ query = '', page }: UpdateUrlProps) => {
  const url = new URL(window.location.href);

  if (query === '') url.searchParams.delete('q');
  else url.searchParams.set('q', query);

  if (page && page > 1) url.searchParams.set('page', page.toString());
  else url.searchParams.delete('page');

  window.history.pushState({}, '', url);
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setup': {
      const { addsearchApiKey } = action.payload as SetupActionPayload;
      const { enableParamsSync } = state;
      const client = new AddSearchClient(addsearchApiKey);

      const { url } = action.payload as SetupActionPayload;
      const params = { page: 1, query: '' };

      if (enableParamsSync) {
        params.query = url?.searchParams.get('q') || '';
        const page = Number(url?.searchParams.get('page'));
        params.page = page && Number.isInteger(page) && page > 0 ? Number(page) : 1;
      }

      return { ...state, ...params, client };
    }
    case 'search': {
      const { query, page } = action.payload as Pick<State, 'query' | 'page'>;
      const { enableParamsSync, query: currentQuery, page: currentPage } = state;

      if (query === currentQuery && page === currentPage) return state;

      if (enableParamsSync) updateUrl({ query, page });

      return { ...state, query, page };
    }
    case 'set-results': {
      const { client, ...rest } = action.payload as SetResultsPayload;
      return { ...state, ...rest };
    }
    case 'set-loading': {
      return { ...state, loading: true };
    }
    default:
      throw new Error('Unlisted action dispatched in SearchReducer');
  }
};

const initialState: State = {
  client: null,
  query: '',
  page: 1,
  totalHits: 0,
  results: null,
  error: null,
  loading: false,
};

interface UseSearchProps {
  addsearchApiKey?: string;
  enableParamsSync?: boolean;
  pageLength?: number;
  configureClient?: ({
    client,
    query,
    page,
    pageLength,
  }: {
    // NOTE: `client` is the AddSearchClient instance that is not typed
    client: any;
    query?: string;
    page: State['page'];
    pageLength: number;
  }) => void;
}

const useSearch = ({ addsearchApiKey, enableParamsSync = false, pageLength = 10, configureClient }: UseSearchProps) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, enableParamsSync });
  const { client, query, page } = state;

  const search = useCallback(
    (payload: Pick<State, 'query' | 'page'>) => dispatch({ type: 'search', payload }),
    [dispatch],
  );
  const setResults = useCallback(
    (payload: SetResultsPayload) => dispatch({ type: 'set-results', payload }),
    [dispatch],
  );

  useEffect(() => {
    if (!addsearchApiKey) return;

    dispatch({ type: 'setup', payload: { addsearchApiKey, url: new URL(window.location.href) } });
  }, [addsearchApiKey]);

  useEffect(() => {
    if (!client) return;

    if (query === '') {
      setResults({ ...initialState, client });
      return;
    }

    dispatch({ type: 'set-loading' });

    if (configureClient)
      configureClient({
        client,
        query,
        page,
        pageLength,
      });

    client.search(query, (result: Result) => {
      if (result.error) {
        setResults({ loading: false, error: result.error, totalHits: 0, results: null });
        return;
      }

      if (result.hits) {
        setResults({
          loading: false,
          error: null,
          totalHits: result.total_hits,
          results: result.hits,
        });

        return;
      }

      setResults({
        loading: false,
        error: { message: 'Invalid API response.' },
        totalHits: 0,
        results: null,
      });
    });
  }, [query, page, pageLength, client, configureClient, setResults]);

  return {
    state,
    actions: {
      search,
      setResults,
    },
    config: {
      pageLength,
    },
  };
};

export default useSearch;
