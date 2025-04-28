import { Dispatch, SetStateAction, useMemo, useState } from "react";

interface UsePaginationOptions {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
   
}

interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setCurrentPageSize: Dispatch<SetStateAction<number>>
}

export function usePagination({
  totalItems,
  pageSize = 10,
  initialPage = 1,

}: UsePaginationOptions): UsePaginationResult {
  const [currentPage, setCurrentPage] = useState(initialPage);
const [currentPageSize, setCurrentPageSize] = useState(pageSize);   
  const totalPages = Math.ceil(totalItems / currentPageSize);

  const setPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

 

  return {
    currentPage,
    totalPages,
    pageSize:currentPageSize,
    setPage,
    nextPage,
    prevPage,
    setCurrentPageSize,
  };
}
