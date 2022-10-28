/**
 * This function fixes issues where textile would see an inline text tag as the first
 * thing that it sees in a paragraph, and avoid wrapping that paragraph tag correctly in
 * <p></p> tags
 * We achieve this by doing the wrapping ahead of time.
 */
export const fixLeadingHtmlTags: StringTransformation = (content) => content.replace(/^(\*[^\s]+\*.*)$/gm, '<p>$1</p>');
