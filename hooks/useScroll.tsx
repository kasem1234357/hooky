import { useState, useEffect, useRef } from "react";

interface UseScrollOptions {
  onEndReached?: () => void;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
  threshold?: number;
  trackElement?: React.RefObject<HTMLElement>;
  throttleDelay?: number;
}

interface ScrollState {
  scrollX: number;
  scrollY: number;
  scrollingUp: boolean;
  scrollingDown: boolean;
  scrollPercentage: number;
  isAtBottom: boolean;
  isAtTop: boolean;
  isScrolling: boolean;
}

export function useScroll({
  onEndReached,
  onScrollStart,
  onScrollEnd,
  threshold = 0.9,
  trackElement,
  throttleDelay = 100,
}: UseScrollOptions = {}): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollX: 0,
    scrollY: 0,
    scrollingUp: false,
    scrollingDown: false,
    scrollPercentage: 0,
    isAtBottom: false,
    isAtTop: true,
    isScrolling: false,
  });

  const lastScrollY = useRef(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<number>(0);

  useEffect(() => {
    const target = trackElement?.current || window;

    const handleScroll = () => {
      const currentScrollY = trackElement?.current?.scrollTop ?? window.scrollY;
      const currentScrollX = trackElement?.current?.scrollLeft ?? window.scrollX;
      const maxScroll = (trackElement?.current?.scrollHeight ?? document.documentElement.scrollHeight) - (trackElement?.current?.clientHeight ?? window.innerHeight);
      const scrollPercent = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;

      setScrollState((prev) => ({
        ...prev,
        scrollX: currentScrollX,
        scrollY: currentScrollY,
        scrollingUp: currentScrollY < lastScrollY.current,
        scrollingDown: currentScrollY > lastScrollY.current,
        scrollPercentage: scrollPercent,
        isAtBottom: currentScrollY + 10 >= maxScroll,
        isAtTop: currentScrollY <= 0,
        isScrolling: true,
      }));

      if (onEndReached && scrollPercent >= threshold * 100) {
        onEndReached();
      }

      if (!isScrolling.current && onScrollStart) {
        onScrollStart();
      }

      isScrolling.current = true;
      lastScrollY.current = currentScrollY;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = window.setTimeout(() => {
        isScrolling.current = false;
        if (onScrollEnd) {
          onScrollEnd();
        }
        setScrollState((prev) => ({ ...prev, isScrolling: false }));
      }, throttleDelay);
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, [onEndReached, onScrollStart, onScrollEnd, threshold, trackElement, throttleDelay]);

  return scrollState;
}