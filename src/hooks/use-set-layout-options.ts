import { useLayoutEffect } from 'react';
import { LayoutOptions, useLayoutContext } from 'src/contexts/layout-context';

/**
 * Custom hook to set layout options in the layout context.
 *
 * @param {LayoutOptions} [options] - Optional layout options to set. If not provided,
 * default options `{ sidebar: false, searchBar: false }` will be used.
 *
 * @example
 * ```typescript
 * const options = { sidebar: true, searchBar: true };
 * useSetLayoutOptions(options);
 * ```
 */
export const useSetLayoutOptions = (options?: LayoutOptions) => {
  const { setLayoutOptions } = useLayoutContext();
  useLayoutEffect(() => {
    setLayoutOptions(options ?? { sidebar: true, searchBar: true, template: 'base' });
  }, [options, setLayoutOptions]);
};
