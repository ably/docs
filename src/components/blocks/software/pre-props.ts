import { HtmlComponentProps } from '../../html-component-props';

export type PreProps = HtmlComponentProps<'pre'> & {
  language: string;
  languages: string[];
  altData?: Record<string, string | any[] | null | undefined>;
};
