import { Link } from 'gatsby';
import { usePageLanguage } from '../../contexts/page-language-context';
import languageLabels from '../../maps/language';
import { getLanguageDefaults } from '../common/language-defaults';

const LanguageLink = ({ language }: { language: string }) => {
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
      {languageLabels[language] ?? language}
    </Link>
  );
};

export default LanguageLink;
