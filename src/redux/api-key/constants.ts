export const API_KEY_LOADED_EVENT = 'apikeys/loaded';
export const API_KEYS_REDUCER_KEY = 'api-key';
const WEB_API = process.env.GATSBY_WEBSITE_API || 'http://localhost:3000';
export const WEB_API_USER_DATA_ENDPOINT = `${WEB_API}/api/me`;
export const WEB_API_KEYS_DATA_ENDPOINT = `${WEB_API}/api/api_keys`;
export const WEB_API_TEMP_KEY_ENDPOINT = `${WEB_API}/ably-auth/token/docs`;
