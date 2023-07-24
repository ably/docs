const herokuAppSite = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : 'http://localhost:8000';

const sitePrefix = process.env.GATSBY_DOCS_SITE_URL ?? herokuAppSite;

export const srcFromDocsSite = (src: string) => `${sitePrefix}${src}`;
