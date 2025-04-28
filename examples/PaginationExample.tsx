"use client";

import { usePagination } from "@/hooks/usePagination";

const PaginationExample = () => {
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    pageSize,
    setCurrentPageSize,
  } = usePagination({
    totalItems: 100,
    pageSize: 10,
    initialPage: 1,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      <div>
        <label>Change Page Size:</label>
        <select
          value={pageSize}
          onChange={(e) => setCurrentPageSize(Number(e.target.value))}
          className="p-2 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationExample;