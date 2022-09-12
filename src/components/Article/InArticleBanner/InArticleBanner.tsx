import React, { FC } from 'react';

export const InArticleBanner: FC = ({ children }) => (
  <aside className="bg-extra-light-grey border border-mid-grey rounded-lg p-40 col-span-full my-64">{children}</aside>
);
