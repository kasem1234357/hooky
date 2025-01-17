import { RefObject, useRef } from "react";

export default function usePrevious(value:any,opt:{isTheSameFn:null|(()=>void);isnotTheSame:null|(()=>void)}={
  isTheSameFn:null,
  isnotTheSame:null
}) {
  console.log(value);
  const currentRef = useRef(value);
  const previousRef:RefObject<unknown> = useRef(null);
  let result = value
  let isTheSame = true

  if (currentRef.current !== value) {
    opt.isnotTheSame && opt.isnotTheSame()
    isTheSame=false
    previousRef.current = currentRef.current;

    result = previousRef.current
    currentRef.current = value;

  }
  opt.isTheSameFn && opt.isTheSameFn()

  return {
    previousValue:result,
    isTheSame
  }
}
