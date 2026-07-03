import { useEffect, useRef } from "react";

type Options = {
  observationElements: HTMLElement[];
  onIntersect?: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
  onNoIntersect?: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
  onObserved?: (element: HTMLElement) => void;
  onUnobserved?: (element: HTMLElement) => void;
  visibilityThreshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
};

const useIntersectionObserver = ({
  observationElements,
  onIntersect,
  onNoIntersect,
  onObserved,
  onUnobserved,
  visibilityThreshold = 0,
  rootMargin = "0px",
  root = null,
}: Options) => {
  const savedCallbacks = useRef({ onIntersect, onNoIntersect, onObserved, onUnobserved });
  
  useEffect(() => {
    savedCallbacks.current = { onIntersect, onNoIntersect, onObserved, onUnobserved };
  }, [onIntersect, onNoIntersect, onObserved, onUnobserved]);

  useEffect(() => {
    if (!observationElements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            savedCallbacks.current.onIntersect?.(entries, obs);
          } else {
            savedCallbacks.current.onNoIntersect?.(entries, obs);
          }
        });
      },
      { root, rootMargin, threshold: visibilityThreshold }
    );

    observationElements.forEach((el) => {
      savedCallbacks.current.onObserved?.(el);
      observer.observe(el);
    });

    // 2. Proper cleanup logic
    return () => {
      observationElements.forEach((el) => {
        savedCallbacks.current.onUnobserved?.(el);
        observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, [observationElements, root, rootMargin, visibilityThreshold]);
};

export default useIntersectionObserver;