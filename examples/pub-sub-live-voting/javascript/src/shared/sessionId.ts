// Session IDs are 6 base36 chars: 5 random + 1 check digit. The check digit
// catches typos when someone is entering the ID by hand (the QR-scan path
// already gets it right). The weighted sum catches single-char substitutions
// and most adjacent transpositions.

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
const SESSION_LENGTH = 6;

function checkChar(body: string): string {
  let sum = 0;
  for (let i = 0; i < body.length; i++) {
    const idx = ALPHABET.indexOf(body[i]);
    if (idx < 0) return '';
    sum += (i + 1) * idx;
  }
  return ALPHABET[sum % ALPHABET.length];
}

export function generateSessionId(): string {
  let body = '';
  while (body.length < SESSION_LENGTH - 1) {
    body += Math.floor(Math.random() * ALPHABET.length).toString(36);
  }
  return body + checkChar(body);
}

export function isValidSessionId(s: string): boolean {
  if (s.length !== SESSION_LENGTH) return false;
  if (!/^[0-9a-z]+$/.test(s)) return false;
  return checkChar(s.slice(0, -1)) === s.slice(-1);
}
