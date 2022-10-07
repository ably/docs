import { indent } from '../shared-utilities';
import { StringContent } from '../StringContentOrderedList';

export const applyIndent = (indentation: number) => (content: StringContent) => ({
  ...content,
  data: indent(content.data, indentation),
});
