import { existsSync } from 'fs';

export const safeFileExists = (path: string): boolean => {
  try {
    return existsSync(path);
  } catch (err) {
    console.error(`Error checking if script file exists for slug`, err);
    return false;
  }
};
