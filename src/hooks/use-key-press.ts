import { useCallback, useEffect } from 'react';

export const useKeyPress = (targetKey: string[] | string, callback: (e: KeyboardEvent) => void) => {
  const handleKeyPress = useCallback(
    ({ key, ...keyboardEvent }: KeyboardEvent) => {
      const shouldTriggerCallback = Array.isArray(targetKey) ? targetKey.includes(key) : key === targetKey;

      if (shouldTriggerCallback) {
        callback({ key, ...keyboardEvent });
      }
    },
    [targetKey, callback],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]); // Empty array ensures that effect is only run on mount and unmount
};
