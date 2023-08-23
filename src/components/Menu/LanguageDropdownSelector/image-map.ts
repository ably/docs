import { FunctionComponent } from 'react';
import { CSharp } from './LanguageLogos/CSharp';
import { DotNet } from './LanguageLogos/DotNet';
import { Flutter } from './LanguageLogos/Flutter';
import { Go } from './LanguageLogos/Go';
import { Java } from './LanguageLogos/Java';
import { JavaScript } from './LanguageLogos/JavaScript';
import { ReactJS } from './LanguageLogos/React';
import { Kotlin } from './LanguageLogos/Kotlin';
import { NodeJs } from './LanguageLogos/NodeJs';
import { ObjC } from './LanguageLogos/ObjC';
import { Php } from './LanguageLogos/Php';
import { Python } from './LanguageLogos/Python';
import { Ruby } from './LanguageLogos/Ruby';
import { Swift } from './LanguageLogos/Swift';
import { Android } from './LanguageLogos/Android';

const imageMapKeys = [
  'android',
  'react',
  'csharp',
  'dotnet',
  'flutter',
  'go',
  'java',
  'javascript',
  'nodejs',
  'objc',
  'php',
  'python',
  'ruby',
  'swift',
  'kotlin',
];
type ImageMapKey = (typeof imageMapKeys)[number];

export const isInImageMap = (maybeImageMapKey: string): maybeImageMapKey is ImageMapKey =>
  imageMapKeys.includes(maybeImageMapKey as ImageMapKey);

export const imageMap: {
  [key in ImageMapKey]: FunctionComponent;
} = {
  android: Android,
  csharp: CSharp,
  dotnet: DotNet,
  flutter: Flutter,
  go: Go,
  java: Java,
  javascript: JavaScript,
  react: ReactJS,
  nodejs: NodeJs,
  objc: ObjC,
  php: Php,
  python: Python,
  ruby: Ruby,
  swift: Swift,
  kotlin: Kotlin,
} as const;
