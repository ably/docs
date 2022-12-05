import { ReactNode } from 'react';
import { HtmlComponentProps } from 'src/components/html-component-props';

type ParagraphComponent = ({ data, attribs }: HtmlComponentProps<'p'>) => ReactNode;

export const PendingClassName =
  ({ data, attribs }: HtmlComponentProps<'p'>, Block: ParagraphComponent) =>
  (className: string) =>
    Block({ data, attribs: { ...attribs, className: `leading-relaxed ${className} ${attribs?.className ?? ''}` } });
