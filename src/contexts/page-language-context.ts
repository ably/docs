import { createContext } from 'react';
import { DEFAULT_LANGUAGE } from '../../data/createPages/constants';

const PageLanguageContext = createContext(DEFAULT_LANGUAGE);

export default PageLanguageContext;
