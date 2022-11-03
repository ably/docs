// Restrict this for img tags for now; we do not know what the implications of a larger-scale replacement would be.
export const fixImgTagsWithNewlines: StringTransformation = (content) =>
  content.replace(/<img[^>]*\n+[^>]*>/g, (match) => match.replace(/\s{2,}/gm, ' '));
