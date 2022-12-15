// Source: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Source: https://gist.github.com/JohnAlbin/2fc05966624dffb20f4b06b4305280f9
require('ts-node').register();

module.exports = require('./gatsby-config.ts');
