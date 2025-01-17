import { useCallback, useEffect, useRef } from "react";

export default function useTimeout(
  callback,
  delay,
  depancey,
  asInitialValue= false
) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    console.log("from set", new Date().getTime());

    timeoutRef.current = setTimeout(() => {
      console.log(new Date().getTime());

      return callbackRef.current();
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    console.log("from cleer");
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    console.log("from useEffect fn");
    asInitialValue && set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    console.log("from reset");
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
