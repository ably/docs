const herokuAppSite = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : 'http://localhost:9000';

export const srcFromDocsSite = (src: string) => `${process.env.GATSBY_DOCS_SITE_URL ?? herokuAppSite}${src}`;
