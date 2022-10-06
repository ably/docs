import { indent } from '../shared-utilities';
import { StringContentOrderedList } from '../StringContentOrderedList';

export const skipAndApplyIndent = (indentation: number) => (content: StringContentOrderedList, i: number) => {
  if (i === 0) {
    return {
      ...content,
      data: indent(content.data.substring(content.data.indexOf('\n') + 1), indentation),
    };
  }

  return {
    ...content,
    data: indent(content.data, indentation),
  };
};
