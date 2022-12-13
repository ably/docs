// Source: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

if (process.env.HEROKU_APP_NAME) {
  require('fs').writeFileSync(`.env.${process.env.NODE_ENV}`, `GATSBY_HEROKU_APP_NAME=${process.env.HEROKU_APP_NAME}`);
}

// Source: https://gist.github.com/JohnAlbin/2fc05966624dffb20f4b06b4305280f9
require('ts-node').register();

module.exports = require('./gatsby-config.ts');
