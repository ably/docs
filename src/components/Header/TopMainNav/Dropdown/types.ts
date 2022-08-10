import React from 'react';
import { Link, SessionState } from '../../../../contexts/user-context';
import { dropdownData } from './Button/dropdown-data';
import { Content } from './Contents';

export type DropdownData = {
  summaryTitle: keyof typeof dropdownData;
  summaryDescription: string;
  summaryLink?: {
    text: string;
    href: string;
  };
  contents: Content[];
  title: string;
  CustomComponent?: React.FunctionComponent<{ sessionState: SessionState; links: Link[]; preferredEmail: string }>;
};

export type DropdownDataIdentifier = keyof typeof dropdownData | null;
