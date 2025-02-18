import { Link } from 'gatsby';
import { usePageLanguage } from '../../contexts/page-language-context';
import { getLanguageDefaults } from '../common/language-defaults';
import { languageLabel } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';

const LanguageLink = ({ language }: { language: LanguageKey }) => {
  const { currentLanguage: pageLanguage } = usePageLanguage();

  const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(language, pageLanguage);
  const href = isPageLanguageDefault
    ? `./language/${language}`
    : `../../${isLanguageDefault ? '' : `language/${language}`}`;

  return (
    <Link
      className="cursor-pointer relative select-none block text-brand-black hover:text-brand-richOrange active:text-brand-richOrange"
      to={href}
    >
      {languageLabel(language) ?? language}
    </Link>
  );
};

export default LanguageLink;
