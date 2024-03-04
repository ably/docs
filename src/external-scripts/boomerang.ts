/* global Boomerang */

import { scriptLoader } from './utils';

const boomerang = ({ appName }) => {
  scriptLoader(document, 'https://s3.amazonaws.com/assets.heroku.com/boomerang/boomerang.js', {
    crossorigin: true,
    onload: () => Boomerang.init({ app: appName, addon: 'ably' }),
  });
};

export default boomerang;
