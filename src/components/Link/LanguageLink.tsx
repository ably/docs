import { Link } from 'gatsby';
import { getLanguageDefaults } from '../common/language-defaults';
import { languageLabel } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';
import { useLayoutContext } from 'src/contexts/layout-context';
const LanguageLink = ({ language }: { language: LanguageKey }) => {
  const { activePage } = useLayoutContext();

  const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(language, activePage.language);
  const href = isPageLanguageDefault
    ? `./language/${language}`
    : `../../${isLanguageDefault ? '' : `language/${language}`}`;

  return (
    <Link
      className="cursor-pointer relative select-none block text-neutral-1300 hover:text-orange-600 active:text-orange-600"
      to={href}
    >
      {languageLabel(language) ?? language}
    </Link>
  );
};

export default LanguageLink;
