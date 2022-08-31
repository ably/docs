import React from 'react';

export const HorizontalMenuItemGroup = ({
  additionalStyles,
  children,
}: {
  additionalStyles?: string;
  children: React.ReactNode;
}) => <div className={`flex flex-row ${additionalStyles ?? ''}`}>{children}</div>;
