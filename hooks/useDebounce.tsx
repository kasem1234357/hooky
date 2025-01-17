import { useEffect } from "react";
import useTimeout from "./useTimeout";

/* 
    useDebounce use Cases
    implement setTimeout with specific dependency


*/
export default function useDebounce(
  callback: () => void,
  delay:number,
  dependencies: any[],
  asInitialValue=false
) {
  const { reset, clear } = useTimeout(callback, delay, dependencies,asInitialValue);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
  return {reset,clear}
}
