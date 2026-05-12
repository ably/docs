import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  $language,
  SUPPORTED_LANGUAGES,
  initLanguageFromEnvironment,
  setLanguage,
  type LanguageKey,
} from '../../stores/language';

const DISPLAY_NAMES: Record<LanguageKey, string> = {
  javascript: 'JavaScript',
  nodejs: 'Node.js',
  react: 'React',
  python: 'Python',
  ruby: 'Ruby',
  java: 'Java',
  go: 'Go',
  php: 'PHP',
  csharp: 'C#',
  swift: 'Swift',
  kotlin: 'Kotlin',
  flutter: 'Flutter',
  objc: 'Objective-C',
  android: 'Android',
  rest: 'REST',
  realtime: 'Realtime',
  shell: 'Shell',
};

const LanguageSelector = () => {
  const current = useStore($language);

  // Initial sync from URL/localStorage; also mirror into <html data-lang>.
  useEffect(() => {
    initLanguageFromEnvironment();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.lang = current;
  }, [current]);

  return (
    <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
      <span className="hidden md:inline">Language</span>
      <select
        value={current}
        onChange={(e) => setLanguage(e.target.value as LanguageKey)}
        className="border border-neutral-300 rounded px-2 py-1 bg-white text-neutral-1300"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {DISPLAY_NAMES[lang]}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelector;
