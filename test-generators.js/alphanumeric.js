import * as fc from 'fast-check';

const alphaNumericString = fc.asciiString({ minLength: 1 }).map((str) => str.replace(/[^a-zA-Z0-9]/g, 'a'));

export default alphaNumericString;
