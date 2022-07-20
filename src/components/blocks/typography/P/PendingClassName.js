export const PendingClassName =
  ({ data, attribs }, Block) =>
  (className) =>
    Block({ data, attribs: { ...attribs, className: `${className} ${attribs.className}` } });
