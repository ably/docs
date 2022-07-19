import { safeFileExists } from './safeFileExists';

describe('File loading test', () => {
  it('Successfully loads an existing file', () => {
    expect(safeFileExists('static/scripts/quick-start-guide.js')).toBe(true);
  });
  it('Returns false for a non-existing file', () => {
    expect(safeFileExists('static/scripts/no-script-exists-for-this-value.c')).toBe(false);
  });
});
