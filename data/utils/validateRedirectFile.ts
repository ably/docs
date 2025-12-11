import * as fs from 'fs';

export const REDIRECT_FILE_PATH = 'config/nginx-redirects.conf';

export interface RedirectValidationResult {
  exists: boolean;
  lineCount: number;
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates the nginx redirects configuration file
 * @param options Optional configuration for validation
 * @returns Validation result with status and any errors/warnings
 */
export const validateRedirectFile = (options?: {
  minRedirects?: number;
  validateFormat?: boolean;
}): RedirectValidationResult => {
  const { minRedirects = 0, validateFormat = true } = options ?? {};

  const result: RedirectValidationResult = {
    exists: false,
    lineCount: 0,
    isValid: true,
    errors: [],
    warnings: [],
  };

  // Check if file exists
  if (!fs.existsSync(REDIRECT_FILE_PATH)) {
    result.errors.push(`${REDIRECT_FILE_PATH} does not exist`);
    result.isValid = false;
    return result;
  }
  result.exists = true;

  // Read and count non-empty lines
  const content = fs.readFileSync(REDIRECT_FILE_PATH, 'utf-8');
  const lines = content.trim().split('\n').filter((line) => line.length > 0);
  result.lineCount = lines.length;

  // Check if file has content
  if (result.lineCount === 0) {
    result.errors.push(`${REDIRECT_FILE_PATH} is empty (no redirect rules found)`);
    result.isValid = false;
    return result;
  }

  // Check minimum redirect count
  if (minRedirects > 0 && result.lineCount < minRedirects) {
    result.warnings.push(
      `Found only ${result.lineCount} redirects, expected at least ${minRedirects}. ` +
        `This may indicate an issue with redirect generation.`,
    );
  }

  // Validate redirect format if requested
  if (validateFormat) {
    const invalidLines = lines.filter((line) => !line.match(/^\/[^\s]+ \/[^\s]+;$/));

    if (invalidLines.length > 0) {
      result.warnings.push(
        `Found ${invalidLines.length} lines with invalid redirect format. ` +
          `Expected format: "/from /to;" - First few: ${invalidLines.slice(0, 3).map((l) => `"${l}"`).join(', ')}`,
      );
    }
  }

  return result;
};

/**
 * Counts the number of redirect lines written so far
 * Used for in-process validation during build
 */
export const countRedirectLines = (): number => {
  if (!fs.existsSync(REDIRECT_FILE_PATH)) {
    return 0;
  }
  const content = fs.readFileSync(REDIRECT_FILE_PATH, 'utf-8');
  return content.trim().split('\n').filter((line) => line.length > 0).length;
};
