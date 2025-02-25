import * as fs from 'fs';

export const writeRedirectToConfigFile = (filePath: string) => {
  fs.writeFileSync(filePath, '');
  return (from: string, to: string) => {
    fs.appendFileSync(filePath, createRedirectForConfigFile(from, to));
  };
};

const createRedirectForConfigFile = (from: string, to: string): string => `${from} ${to};\n`;
