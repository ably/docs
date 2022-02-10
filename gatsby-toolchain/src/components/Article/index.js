import React from 'react';

const Article = ({ columns=3, children }) => <article className={`col-span-${columns}`}>{
        children    
}</article>;

export default Article;