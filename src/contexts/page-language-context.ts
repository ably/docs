import { createContext } from 'react';
import { DEFAULT_LANGUAGE } from '../../data/createPages/constants';

const PageLanguageContext = createContext(DEFAULT_LANGUAGE);

export const PageLanguagesContext = createContext<string[]>([]);

export default PageLanguageContext;
