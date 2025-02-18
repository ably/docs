import { useLayoutEffect } from 'react';
import { LayoutOptions, useLayoutContext } from 'src/contexts/layout-context';

/**
 * Custom hook to set layout options in the layout context.
 *
 * @param {LayoutOptions} [options] - Optional layout options to set. If not provided,
 * default options `{ noSidebar: false, hideSearchBar: false }` will be used.
 *
 * @example
 * ```typescript
 * const options = { noSidebar: true, hideSearchBar: true };
 * useSetLayoutOptions(options);
 * ```
 */
export const useSetLayoutOptions = (options?: LayoutOptions) => {
  const { setLayoutOptions } = useLayoutContext();
  useLayoutEffect(() => {
    setLayoutOptions(options ?? { noSidebar: false, hideSearchBar: false });
  }, [options, setLayoutOptions]);
};
