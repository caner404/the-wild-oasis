import { useEffect, useRef } from 'react';

interface useOutSideClickProps {
  listenCapturing: boolean;
  handler: () => void;
}
export function useOutSideClick({ listenCapturing = true, handler }: useOutSideClickProps) {
  const ref = useRef<HTMLUListElement>();

  useEffect(
    function () {
      function handleClick(e: React.MouseEvent<HTMLElement>) {
        if (ref.current && !ref.current.contains(e.target as HTMLInputElement)) {
          handler();
        }
      }

      document.addEventListener('click', () => handleClick, listenCapturing);

      return () => document.removeEventListener('click', () => handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
