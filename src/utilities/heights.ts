/**
 * Layout height helpers. Local replacement for @ably/ui/core/utils/heights
 * (DX-1128).
 */
export const HEADER_HEIGHT = 64;
export const HEADER_BOTTOM_MARGIN = 24;

export const componentMaxHeight = (...heights: number[]): string => {
  const totalHeight = `${heights.reduce((sum, height) => sum + height, 0)}px`;
  return `calc(min(100dvh, 100vh) - ${totalHeight})`;
};
