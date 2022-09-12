import React, { FC } from 'react';

export const InArticleBannerCopy: FC<{ title: string }> = ({ title, children }) => (
  <>
    <h3 className="ui-text-h3">{title}</h3>
    <p className="ui-text-p1 my-16">{children}</p>
  </>
);
