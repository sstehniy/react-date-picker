import React, { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<any>,
  cb: (e: MouseEvent) => void
) => {
  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    const handleClickOutside = (e: MouseEvent) => {
      if (node.contains(e.target)) {
        return;
      }
      cb(e);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
};
