import { useMemo } from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import { languageData } from 'src/data/languages';
import { ProductKey } from 'src/data/types';

export const useShowLanguageSelector = () => {
  const { activePage } = useLayoutContext();

  return useMemo(
    () =>
      activePage.isDualLanguage ||
      (activePage.languages.length > 0 &&
        !activePage.languages.every(
          (language) => !Object.keys(languageData[activePage.product as ProductKey] ?? {}).includes(language),
        )),
    [activePage.languages, activePage.product, activePage.isDualLanguage],
  );
};
