const yaml = require('js-yaml');
const fs = require('fs');
const { isArray } = require('lodash');

const JSBIN_YAML_PATH = 'data/jsbins.yaml';
const jsbin = yaml.load(fs.readFileSync(JSBIN_YAML_PATH, 'utf-8'));

const JSBIN_CLIENT_OPTIONS = {
  ssl: true,
  host: 'jsbin.ably.com',
  port: 443,
};

const jsbinClient = {
  url_for: (id, options = JSBIN_CLIENT_OPTIONS) => {
    const maybePanels = isArray(options.panels) ? options.panels.join(',') : options.panels;
    const panels =
      maybePanels && (options.embed || !options.preview)
        ? options.embed
          ? `/embed?${maybePanels}`
          : `/edit#${panels}`
        : '';
    const url = `${options.ssl ? 'https' : 'http'}://${options.host}:${options.port}/${id}${
      options.revision ? `/${options.revision}` : `/latest`
    }${panels}`;
    return url;
  },
};

module.exports = {
  jsbin,
  jsbinClient,
};
