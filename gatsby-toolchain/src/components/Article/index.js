import React from 'react';
import ConditionalChildrenLanguageDisplay from '../blocks/wrappers/ConditionalChildrenLanguageDisplay';

const Article = ({ children }) => <article className="col-span-4">{
        children    
}</article>;

export default Article;