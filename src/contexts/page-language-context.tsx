import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PREFERRED_LANGUAGE_KEY, safeWindow } from 'src/utilities';
import { DEFAULT_LANGUAGE } from '../../data/createPages/constants';
import { useUrlParams } from '../hooks';

interface PageLanguageContextProps {
  currentLanguage: string;
  handleCurrentLanguageChange: (lang: string) => void;
  getPreferredLanguage: () => string | null | undefined;
  setPreferredLanguage: (lang: string) => void;
}

const initialState = {
  currentLanguage: DEFAULT_LANGUAGE,
  handleCurrentLanguageChange: () => null,
  getPreferredLanguage: () => null,
  setPreferredLanguage: () => null,
};

export const PageLanguageContext = createContext<PageLanguageContextProps>(initialState);

export function usePageLanguage() {
  const context = useContext(PageLanguageContext);

  if (context === undefined) {
    throw new Error('usePageLanguage context must be used within a PageLanguageProvider');
  }

  return context;
}

interface PageLanguageProviderProps {
  children: ReactNode;
  search: string;
}

export const PageLanguageProvider: React.FC<PageLanguageProviderProps> = ({ children, search }) => {
  const { getParam } = useUrlParams();
  const param = getParam('lang');

  const getPreferredLanguage = useCallback(() => safeWindow.sessionStorage.getItem(PREFERRED_LANGUAGE_KEY), []);
  const setPreferredLanguage = useCallback(
    (lang: string) => safeWindow.sessionStorage.setItem(PREFERRED_LANGUAGE_KEY, lang),
    [],
  );

  const [currentLanguage, setCurrentLanguage] = useState<string>((param || getPreferredLanguage()) ?? DEFAULT_LANGUAGE);

  useEffect(() => {
    setCurrentLanguage((param || getPreferredLanguage()) ?? DEFAULT_LANGUAGE);
  }, [param, getPreferredLanguage]);

  useEffect(() => {
    setPreferredLanguage(currentLanguage);
  }, [currentLanguage, setPreferredLanguage]);

  const handleCurrentLanguageChange = (lang: string) => {
    setCurrentLanguage(lang ?? DEFAULT_LANGUAGE);
  };

  const value = { currentLanguage, handleCurrentLanguageChange, getPreferredLanguage, setPreferredLanguage };

  return <PageLanguageContext.Provider value={value}>{children}</PageLanguageContext.Provider>;
};
