import { useEffect, useRef } from "react";

export const useMutationObserver = (
  callback: MutationCallback,
  targetNode: Node | string,
  config?: MutationObserverInit
) => {
  const observer = useRef(new MutationObserver(callback));

  useEffect(() => {
    if (typeof targetNode === "string") {
      const element = global.document.querySelector(targetNode);

      if (element) {
        observer.current.observe(element, config);
      }
    } else {
      observer.current.observe(targetNode, config);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [targetNode]);

  return observer;
};
