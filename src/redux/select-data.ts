export const selectData =
  (key: string) =>
  (store: Store): Record<string, unknown> => {
    const result = store.getState()[key];
    return result && result.data ? result.data : {};
  };
