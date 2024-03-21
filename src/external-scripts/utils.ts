const defaultAttrs = {
  async: true,
  defer: true,
  data: {},
};

const scriptLoader = (doc, url, customAttrs) => {
  const attrs = { ...defaultAttrs, ...customAttrs };
  const { data } = attrs;
  delete attrs.data;

  const scriptTag = doc.createElement('script');

  Object.keys(attrs).forEach((attr) => (scriptTag[attr] = attrs[attr]));
  scriptTag.src = url;
  scriptTag.type = 'text/javascript';

  Object.keys(data).forEach((attr) => (scriptTag.dataset[attr] = data[attr]));

  // Respect where scripts are first loaded on the page head/end of body etc
  const scripts = doc.getElementsByTagName('script')[0];
  scripts.parentNode.insertBefore(scriptTag, scripts);
};

export { scriptLoader };
