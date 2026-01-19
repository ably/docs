'use client';

import { usePathname } from 'next/navigation';
import { useLayoutContext } from 'src/contexts/layout-context';
import { languageData, languageInfo } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';

/**
 * HiddenLanguageLinks
 *
 * Renders hidden anchor tags for each available language option on the current page.
 * These links are invisible to users but crawlable by search engines and other web crawlers,
 * allowing them to discover all language variants of the documentation.
 *
 * This component should be placed at the bottom of the page layout.
 */
const HiddenLanguageLinks = () => {
  const { activePage } = useLayoutContext();
  const pathname = usePathname();
  const languageVersions = languageData[activePage.product ?? 'pubsub'];

  // Filter languages to match what's available on this page
  const availableLanguages = Object.entries(languageVersions)
    .filter(([lang]) => (activePage.languages ? activePage.languages.includes(lang as LanguageKey) : true))
    .map(([lang, version]) => ({
      label: lang as LanguageKey,
      version,
    }));

  // Only render if there are multiple language options
  if (availableLanguages.length <= 1) {
    return null;
  }

  return (
    <nav className="sr-only" aria-hidden="true">
      <ul>
        {availableLanguages.map((language) => {
          const langInfo = languageInfo[language.label];
          return (
            <li key={language.label}>
              <a href={`${pathname}?lang=${language.label}`}>
                {langInfo?.label || language.label} v{language.version}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default HiddenLanguageLinks;
