const nullIfWindowUndefined = (fn: () => void) => (typeof window === 'undefined' ? null : fn());

export const storage = {
  getItem: (key: string) => nullIfWindowUndefined(() => localStorage.getItem(key)),
  setItem: (key: string, value: string) => nullIfWindowUndefined(() => localStorage.setItem(key, value)),
  clear: () => nullIfWindowUndefined(localStorage.clear),
};
