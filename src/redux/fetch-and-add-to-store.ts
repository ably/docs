/**
 * cf. src/core/remote-session-data.js Ably UI repository
 */
import { identity } from 'lodash';

const NOT_FOUND_ERROR_CODE = 'not-found';
export const DEFAULT_CACHE_STRATEGY = 'no-cache';

const isJsonResponse = (res: Response): boolean => {
  const contentType = res.headers.get('content-type');
  return !!contentType && contentType.includes('application/json');
};

export const getJsonResponse = async (url: string, type: string) => {
  const res = await fetch(url, { cache: DEFAULT_CACHE_STRATEGY });
  const jsonResponse = isJsonResponse(res);
  if (!jsonResponse) {
    const text = await res.text();
    throw new Error(`${type} endpoint at ${url} is not serving JSON, received:\n\n${text}`);
  }

  const payload = await res.json();
  return payload;
};

export type DataProcessor = (payload: Record<string, unknown>) => Promise<Record<string, unknown>>;

export const addDataToStore = async (
  store: Store,
  url: string,
  type: string,
  dataProcessor: DataProcessor = identity,
): Promise<void> => {
  try {
    if (!url) {
      console.warn(`Skipping fetching data of type ${type}, invalid URL: ${url}`);
      dataLoaded({}, store, type);
      return;
    }

    const payload = await getJsonResponse(url, type);

    const processedPayload = await dataProcessor(payload);

    switch (processedPayload.error) {
      case NOT_FOUND_ERROR_CODE:
        dataLoaded({}, store, type);
        return;
      default:
        dataLoaded(processedPayload, store, type);
        return;
    }
  } catch (e) {
    dataLoaded({}, store, type);
    console.warn(`Could not fetch ${type} data due to error:`, e);
  }
};

export const dataLoaded = (payload: Record<string, unknown>, store: Store, type: string): void =>
  store.dispatch({ type, payload });
