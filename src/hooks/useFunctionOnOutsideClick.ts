import { MutableRefObject, useEffect } from 'react';

export type SideEffectfulFunction = () => void;

export const useFunctionOnOutsideClick = (fn: SideEffectfulFunction, ref: MutableRefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const outsideClickEventHandler = (event: MouseEvent) => {
      const target = event.target as Node;
      const shouldFire = ref.current && !ref.current.contains(target);
      if (shouldFire) {
        fn();
      }
    };
    document.addEventListener('mousedown', outsideClickEventHandler);
    return () => document.removeEventListener('mousedown', outsideClickEventHandler);
  }, [ref, fn]);
};
