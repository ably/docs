import { dropdownData } from './Button/dropdown-data';
import { Content } from './Contents/types';

export type DropdownData = {
  summaryTitle: string;
  summaryDescription: string;
  summaryLink?: {
    text: string;
    href: string;
  };
  contents: Content[];
  title: string;
};

export type DropdownDataIdentifier = keyof typeof dropdownData | null;
