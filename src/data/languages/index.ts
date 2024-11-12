import { ProductKey } from '../types';
import languageData from './languageData';
import languageInfo from './languageInfo';
import { LanguageData, LanguageKey } from './types';

const languageLabel = (lang?: LanguageKey, prod?: ProductKey) => {
  const product = prod ?? 'pubsub';
  const language = lang ?? (Object.keys(languageData[product])[0] as LanguageKey);
  const languageLabel = languageInfo[language]?.label;
  const languageVersion = (languageData[product ?? 'pubsub'] as LanguageData)[language];

  return `${languageLabel ?? ''}${languageVersion ? ` v${languageVersion}` : ''}`;
};

export { languageData, languageInfo, languageLabel };
