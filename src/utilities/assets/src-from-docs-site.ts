const herokuAppSite = process.env.GATSBY_HEROKU_APP_NAME
  ? `https://${process.env.GATSBY_HEROKU_APP_NAME}.herokuapp.com`
  : 'http://localhost:9000';

const sitePrefix = `${process.env.GATSBY_DOCS_SITE_URL ?? herokuAppSite}`;

export const srcFromDocsSite = (src: string) => `${sitePrefix}${src}`;
