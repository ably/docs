import { ARTICLE_TYPES } from '../../data/transform/constants';
import { createContext } from 'react';

type ArticleType = keyof typeof ARTICLE_TYPES;

export const ArticleTypeContext = createContext<ArticleType>(ARTICLE_TYPES.document);
