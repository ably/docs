// Rewrites in-SVG ids (and the url(#…) refs to them) to be unique per Icon instance,
// so duplicate gradient/mask glyphs on a page don't collide on DOM ids.
export const setUniqueIds = (el: SVGSVGElement | null, uniqueId: string): void => {
  if (!el) {
    return;
  }

  const defsElements = el.querySelectorAll('defs [id]');
  const elementsWithUrls = el.querySelectorAll(
    '[fill*="url("], [stroke*="url("], [filter*="url("], [clip-path*="url("], [mask*="url("]',
  );

  defsElements.forEach((def) => {
    const oldId = def.id;
    if (oldId.includes(uniqueId)) {
      return;
    }

    const newId = `${oldId}-${uniqueId}`;
    def.id = newId;

    const regex = new RegExp(`url\\(#${oldId}\\)`, 'g');
    elementsWithUrls.forEach((element) => {
      ['fill', 'stroke', 'filter', 'clip-path', 'mask'].forEach((attr) => {
        const value = element.getAttribute(attr);
        if (value && value.includes(`url(#${oldId})`)) {
          element.setAttribute(attr, value.replace(regex, `url(#${newId})`));
        }
      });
    });
  });
};
