import { useState } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import type { IPagination } from "@/interfaces/IPagination";

export const usePagination = (): IPagination => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);

  const changePage = (nextPage: number, nextSize: number) => {
    setPage(nextSize === size ? nextPage : DEFAULT_PAGE);
    setSize(nextSize);
  };

  const resetPage = () => setPage(DEFAULT_PAGE);

  return { page, size, changePage, resetPage };
};
