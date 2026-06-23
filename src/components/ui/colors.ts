export type ColorName =
  | (typeof neutralColors)[number]
  | (typeof orangeColors)[number]
  | (typeof secondaryColors)[number]
  | (typeof guiColors)[number]
  | (typeof aliasedColors)[number];

export const variants = ['', 'dark:'] as const;

type ColorClassVariants = (typeof variants)[number];

export const prefixes = ['text', 'bg', 'from', 'to', 'border'] as const;

type ColorClassPrefixes = (typeof prefixes)[number];

export const colors = ['neutral', 'orange', 'blue', 'yellow', 'green', 'violet', 'pink'] as const;

export type ColorClassColorGroups = (typeof colors)[number];

export type Theme = 'light' | 'dark';

export type ColorClass = `${ColorClassVariants}${ColorClassPrefixes}-${ColorName}`;

export type ColorThemeSet = `${string} dark:${string}`;

export const neutralColors = [
  'neutral-000',
  'neutral-100',
  'neutral-200',
  'neutral-300',
  'neutral-400',
  'neutral-500',
  'neutral-600',
  'neutral-700',
  'neutral-800',
  'neutral-900',
  'neutral-1000',
  'neutral-1100',
  'neutral-1200',
  'neutral-1300',
] as const;

export const orangeColors = [
  'orange-100',
  'orange-200',
  'orange-300',
  'orange-400',
  'orange-500',
  'orange-600',
  'orange-700',
  'orange-800',
  'orange-900',
  'orange-1000',
  'orange-1100',
] as const;

export const yellowColors = [
  'yellow-100',
  'yellow-200',
  'yellow-300',
  'yellow-400',
  'yellow-500',
  'yellow-600',
  'yellow-700',
  'yellow-800',
  'yellow-900',
] as const;

export const greenColors = [
  'green-100',
  'green-200',
  'green-300',
  'green-400',
  'green-500',
  'green-600',
  'green-700',
  'green-800',
  'green-900',
] as const;

export const blueColors = [
  'blue-100',
  'blue-200',
  'blue-300',
  'blue-400',
  'blue-500',
  'blue-600',
  'blue-700',
  'blue-800',
  'blue-900',
] as const;

export const violetColors = [
  'violet-100',
  'violet-200',
  'violet-300',
  'violet-400',
  'violet-500',
  'violet-600',
  'violet-700',
  'violet-800',
  'violet-900',
] as const;

export const pinkColors = [
  'pink-100',
  'pink-200',
  'pink-300',
  'pink-400',
  'pink-500',
  'pink-600',
  'pink-700',
  'pink-800',
  'pink-900',
] as const;

export const secondaryColors = [
  ...yellowColors,
  ...greenColors,
  ...blueColors,
  ...violetColors,
  ...pinkColors,
] as const;

export const guiColors = [
  'gui-blue-default-light',
  'gui-blue-hover-light',
  'gui-blue-active-light',
  'gui-blue-default-dark',
  'gui-blue-hover-dark',
  'gui-blue-active-dark',
  'gui-blue-focus',
  'gui-disabled-light',
  'gui-disabled-dark',
  'gui-success-green',
  'gui-error-red',
  'gui-focus',
  'gui-focus-outline',
  'gui-visited',
] as const;

export const aliasedColors = [
  'white',
  'extra-light-grey',
  'light-grey',
  'mid-grey',
  'dark-grey',
  'charcoal-grey',
  'cool-black',
  'active-orange',
  'bright-red',
  'red-orange',
  'electric-cyan',
  'zingy-green',
  'jazzy-pink',
  'gui-default',
  'gui-hover',
  'gui-active',
  'gui-error',
  'gui-success',
  'gui-default-dark',
  'gui-hover-dark',
  'gui-active-dark',
  'transparent',
] as const;

export const colorRoles = {
  neutral: neutralColors,
  orange: orangeColors,
  secondary: secondaryColors,
  gui: guiColors,
};

export const colorGroupLengths = {
  neutral: neutralColors.length,
  orange: orangeColors.length,
  blue: blueColors.length,
  yellow: yellowColors.length,
  green: greenColors.length,
  violet: violetColors.length,
  pink: pinkColors.length,
};
