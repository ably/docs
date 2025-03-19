import React from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import { LanguageKey } from 'src/data/languages/types';

interface IfProps {
  lang: LanguageKey;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

const If: React.FC<IfProps> = ({ lang, children }) => {
  const { activePage } = useLayoutContext();
  const { language } = activePage;
  const splitLang = lang.split(',');

  return splitLang.includes(language) ? children : null;
};

export default If;
