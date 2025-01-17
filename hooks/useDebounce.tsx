import { useEffect } from "react";
import useTimeout from "./useTimeout";

/* 
    useDebounce use Cases
    implement setTimeout with specific dependency


*/
export default function useDebounce(
  callback,
  delay,
  dependencies,
  asInitialValue=false
) {
  const { reset, clear } = useTimeout(callback, delay, dependencies,asInitialValue);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
  return {reset,clear}
}
