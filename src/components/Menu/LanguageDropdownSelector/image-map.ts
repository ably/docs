import { FunctionComponent } from 'react';
import { CSharp } from './LanguageLogos/CSharp';
import { DotNet } from './LanguageLogos/DotNet';
import { Flutter } from './LanguageLogos/Flutter';
import { Go } from './LanguageLogos/Go';
import { Java } from './LanguageLogos/Java';
import { JavaScript } from './LanguageLogos/JavaScript';
import { NodeJs } from './LanguageLogos/NodeJs';
import { ObjC } from './LanguageLogos/ObjC';
import { Php } from './LanguageLogos/Php';
import { Python } from './LanguageLogos/Python';
import { Ruby } from './LanguageLogos/Ruby';
import { Swift } from './LanguageLogos/Swift';

export const imageMap: {
  [key: string]: FunctionComponent;
} = {
  csharp: CSharp,
  dotnet: DotNet,
  flutter: Flutter,
  go: Go,
  java: Java,
  javascript: JavaScript,
  nodejs: NodeJs,
  objc: ObjC,
  php: Php,
  python: Python,
  ruby: Ruby,
  swift: Swift,
} as const;
