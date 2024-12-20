import { ProductKey } from '../types';
import languageData from './languageData';
import languageInfo from './languageInfo';
import { LanguageData, LanguageKey } from './types';

const languageLabel = (lang?: LanguageKey, prod?: ProductKey) => {
  const product = prod ?? 'pubsub';
  const productLanguages = Object.keys(languageData[product]);
  const language = lang ?? (productLanguages.length > 0 ? (productLanguages[0] as LanguageKey) : undefined);
  const languageLabel = language ? languageInfo[language]?.label : 'Unknown';
  const languageVersion = language ? (languageData[product ?? 'pubsub'] as LanguageData)[language] : '?';

  return `${languageLabel ?? ''}${languageVersion ? ` v${languageVersion}` : ''}`;
};

export { languageData, languageInfo, languageLabel };
