import { scriptLoader } from './utils';

declare const Boomerang: any;

export type BoomerangParams = {
  appName: string;
};

const boomerang = ({ appName }: BoomerangParams) => {
  scriptLoader(document, 'https://s3.amazonaws.com/assets.heroku.com/boomerang/boomerang.js', {
    crossorigin: true,
    onload: () => Boomerang.init({ app: appName, addon: 'ably' }),
  });
};

export default boomerang;
