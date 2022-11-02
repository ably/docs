import { flattenDeep, isArray } from 'lodash/fp';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import { isString } from 'lodash';
import HtmlDataTypes from '../../../../../data/types/html';

export const extractCodeStringsFromContent: (data: HtmlComponentProps<ValidReactElement>[]) => string[] = (data) =>
  data.map((child) => {
    let wrapper = '';
    // Some tags are created by textile-js by mistake.
    let isFalseTag = false;
    switch (child.name) {
      case HtmlDataTypes.code:
        // Don't nest <code> inside <code>; it's probably textile-js mis-interpreting Objective-C code.
        isFalseTag = true;
        wrapper = '@';
        break;
      default:
        break;
    }
    if (isArray(child.data)) {
      const joiningCharacter = !isFalseTag ? '\n' : '';
      const childDataAsString = flattenDeep(extractCodeStringsFromContent(child.data)).join(joiningCharacter);
      return `${wrapper}${childDataAsString}${wrapper}`;
    }
    if (isString(child.data)) {
      return `${wrapper}${child.data}${wrapper}`;
    }
    return '';
  });
