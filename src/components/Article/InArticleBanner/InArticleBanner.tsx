import React, { FC } from 'react';

export const InArticleBanner: FC<{ children: React.ReactNode }> = ({ children }) => (
  <aside className="bg-extra-light-grey border border-mid-grey rounded-lg p-10 col-span-full my-16">{children}</aside>
);
