// Dependencies
import { useState } from "react";

const useTable = (steps:number) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>("id");
  const [searchIn, setSearchIn] = useState<string>('id');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [orderMode, setOrderMode] = useState<string>("desc");
  const [recordsLength, setRecordsLength] = useState<number>(10);

  /**
   * @desc This function using to move one step.
   * @return { void }
   */
  const toNext = (): void => {
    currentStep + 1 < steps && setCurrentStep((prev:number) => prev + 1);
  }

  /**
   * @desc This function using to back one step.
   * @return { void }
   */
  const toBack = (): void => {
    currentStep > 0 && setCurrentStep((prev:number) => prev - 1);
  }

  /**
   * @desc This function using to get how many skips you want.
   * @return { number }
   */
  const skipsLength = (): number => Math.ceil(recordsLength * currentStep);

  /**
   * @desc This function using to handle search time to send a request to database.
   * @param { number } time
   * @return { void }
   */
  const handleSearch = (time:number, callback:()=> void): void=>{
    let timer:number|undefined;
    clearInterval(timer);
    //@ts-ignore
    timer = setTimeout(()=> {
      callback();
      clearTimeout(timer);
    }, time?time:500);
  }

  return {
    currentStep,
    setCurrentStep,
    orderBy,
    setOrderBy,
    searchIn,
    setSearchIn,
    searchQuery,
    setSearchQuery,
    orderMode,
    setOrderMode,
    recordsLength,
    setRecordsLength,
    toNext,
    toBack,
    skipsLength,
    handleSearch
  }
}

export default useTable;
