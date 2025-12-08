import * as fs from 'fs';
import { Reporter } from 'gatsby';

let redirectCount = 0;
let isInitialized = false;

export const writeRedirectToConfigFile = (filePath: string, reporter?: Reporter) => {
  // Detect re-initialization
  if (isInitialized) {
    reporter?.warn(`[REDIRECTS] WARNING: writeRedirectToConfigFile called multiple times!`);
    return (from: string, to: string) => {
      reporter?.warn(`[REDIRECTS] Skipping redirect write due to re-initialization: ${from} -> ${to}`);
    };
  }

  reporter?.info(`[REDIRECTS] Initializing redirect file at ${filePath}`);

  try {
    fs.writeFileSync(filePath, '');
    isInitialized = true;
  } catch (error) {
    reporter?.error(`[REDIRECTS] Failed to initialize redirect file: ${error}`);
    throw error;
  }

  return (from: string, to: string) => {
    try {
      fs.appendFileSync(filePath, createRedirectForConfigFile(from, to));
      redirectCount++;
    } catch (error) {
      reporter?.error(`[REDIRECTS] Failed to write redirect ${from} -> ${to}: ${error}`);
      throw error;
    }
  };
};

export const getRedirectCount = (): number => redirectCount;

export const resetRedirectCount = (): void => {
  redirectCount = 0;
  isInitialized = false;
};

const createRedirectForConfigFile = (from: string, to: string): string => `${from} ${to};\n`;
