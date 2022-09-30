import { isString } from 'lodash/fp';
import { HtmlComponentPropsData } from 'src/components/html-component-props';

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

export const ensureChildDataShows = (data: HtmlComponentPropsData): HtmlComponentPropsData => {
  if (!data) {
    return data;
  }
  if (isString(data)) {
    return data;
  }
  return data.map((child) => ({
    ...child,
    data: ensureChildDataShows(child.data),
    attribs: { ...child.attribs, forcedisplay: 'true' },
  }));
};
