import { useEffect, useRef } from "react";

export const useClickOutside = (cb: () => void) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    const handleClickOutside = (e: MouseEvent) => {
      if (!node.contains(e.target)) {
        cb();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, cb]);

  return ref;
};
