import { createContext } from 'react';
import { DEFAULT_LANGUAGE } from '../../data/createPages/constants';

const PageLanguageContext = createContext(DEFAULT_LANGUAGE);

const pageLanguageContextArray: string[] = [];

export const PageLanguagesContext = createContext(pageLanguageContextArray);

export default PageLanguageContext;
