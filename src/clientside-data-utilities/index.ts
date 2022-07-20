export const attribsContainClass = (
  cssClass: string,
  attribs: {
    className?: string;
  },
) =>
  attribs.className &&
  (attribs.className === cssClass ||
    attribs.className.includes(` ${cssClass} `) ||
    attribs.className.substring(0, cssClass.length + 1) === `${cssClass} ` ||
    attribs.className.substring(attribs.className.length - (cssClass.length + 1)) === ` ${cssClass}`);
