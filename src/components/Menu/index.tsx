import React from 'react';
import './styles.css';

export const HorizontalMenu = ({ children }: { children: React.ReactNode }) => (
  <menu className="docs-horizontal-menu bg-cool-black">{children}</menu>
);
export const TopHorizontalMenuEndAlign = ({ children }: { children: React.ReactNode }) => (
  <menu className="docs-top-horizontal-menu justify-end w-full">{children}</menu>
);
export const TopHorizontalMenuLight = ({ children }: { children: React.ReactNode }) => (
  <menu className="docs-top-horizontal-menu justify-between w-full">{children}</menu>
);
