/*
  Since we perform CSS calc operations involving various UI element heights, we need to centralise
  these values to prevent magic numbers popping up with no obvious reasoning. When making alterations
  to Layout components, consider these values and update where necessary.
*/
export const HEADER_HEIGHT = 64;
export const HEADER_BOTTOM_MARGIN = 24;
export const LANGUAGE_SELECTOR_HEIGHT = 38;
export const INKEEP_ASK_BUTTON_HEIGHT = 96;

/**
 * Calculates the maximum height for a component by subtracting the total of given heights from 100vh.
 *
 * @param {...number} heights - An array of heights in pixels.
 * @returns {string} The CSS calc expression for the maximum height.
 */
export const componentMaxHeight = (...heights: number[]): string => {
  const totalHeight = heights.reduce((sum, height) => sum + height, 0) + 'px';
  return `calc(100vh - ${totalHeight})`;
};
