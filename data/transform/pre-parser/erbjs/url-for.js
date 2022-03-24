const { jsbin, jsbinClient } = require('../jsbins');

const urlforRegex = /<%= JsBins\.url_for\('(.*?)'\) %>/g;

const urlforReplacer = (content) =>
  content.replace(urlforRegex, (_match, path) => {
    const hash = jsbin['jsbin_id'][path];
    return `${jsbinClient.url_for(jsbin['jsbin_hash'][hash])}_?javascript,live`;
  });

module.exports = {
  urlforReplacer,
};
