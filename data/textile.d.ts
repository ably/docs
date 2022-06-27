declare module 'textile-js' {
  type TextileFunction = (input: string) => string;
  const textile: TextileFunction;
  export default textile;
}
