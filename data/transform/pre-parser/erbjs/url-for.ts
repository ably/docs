import { jsbin, jsbinClient } from '../jsbins';

const urlforRegex = /<%= JsBins\.url_for\('(.*?)'\) %>/g;

export const urlforReplacer: StringTransformation = (content) =>
  content.replace(urlforRegex, (_match, path) => {
    const hash = jsbin['jsbin_id'][path];
    return `${jsbinClient.url_for(jsbin['jsbin_hash'][hash])}_?javascript`.replace(/\(external\) /, '');
  });
