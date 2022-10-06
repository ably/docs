import { indent } from '../shared-utilities';
import { StringContent } from '../StringContentOrderedList';

export const applyIndent = (indentation: number) => (content: StringContent) => ({
  ...content,
  data: indent(content.data, indentation),
});

export const skipAndApplyIndent = (indentation: number) => (content: StringContent, i: number) => {
  if (i === 0) {
    const lines = content.data.split('\n');
    const data = `${lines[0]}\n${lines
      .slice(1)
      .map((line) => indent(line, indentation))
      .join('\n')}`;
    return {
      ...content,
      data,
    };
  }

  return {
    ...content,
    data: indent(content.data, indentation),
  };
};
