import React from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';

interface LanguageBlockProps {
  language: 'react' | 'javascript';
  children: React.ReactNode;
}

export const LanguageBlock: React.FC<LanguageBlockProps> = ({ language, children }) => {
  const {
    activePage: { language: currentLanguage },
  } = useLayoutContext();

  if (currentLanguage !== language) {
    return null;
  }

  return <>{children}</>;
};
