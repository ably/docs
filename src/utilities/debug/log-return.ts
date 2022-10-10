/**
 * This is just an identity function that can be used to quickly wrap and monitor values in FRP code.
 * Useful with pipe, compose, streams, observables, and content embedded in React elements.
 */
export const logReturn = (x: unknown) => {
  console.log(x);
  return x;
};
export const lr = logReturn;
