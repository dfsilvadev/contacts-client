import { useMemo } from "react";

import type { Pagination as PaginationType } from "@/data/models/contact";

interface Dependencies {
  readonly pagination: PaginationType;
  readonly onChangePage: (page: number) => void;
}

const usePaginationController = ({
  pagination,
  onChangePage,
}: Dependencies) => {
  const siblingsCount = 1;

  const handlePreviousPage = () => onChangePage(pagination.previousPage);
  const handleNextPage = () => onChangePage(pagination.nextPage);

  const generatePagesArray = (from: number, to: number) => {
    return [...new Array(to - from)]
      .map((_, index) => {
        return from + index + 1;
      })
      .filter((page) => page > 0);
  };

  const previousPages = useMemo(() => {
    return pagination.currentPage > 1
      ? generatePagesArray(
          pagination.currentPage - 1 - siblingsCount,
          pagination.currentPage - 1
        )
      : [];
  }, [pagination.currentPage]);

  const nextPages = useMemo(() => {
    return pagination.currentPage < pagination.lastPage
      ? generatePagesArray(
          pagination.currentPage,
          Math.min(pagination.currentPage + siblingsCount, pagination.lastPage)
        )
      : [];
  }, [pagination.currentPage, pagination.lastPage]);

  const pageStar = useMemo(
    () =>
      (Number(pagination.currentPage) - 1) *
        Number(pagination.registersPerPage) +
      1,
    [pagination.currentPage, pagination.registersPerPage]
  );

  const pageEnd = useMemo(() => {
    const theoreticalEnd = pageStar + Number(pagination.registersPerPage) - 1;
    return Math.min(theoreticalEnd, Number(pagination.totalItems));
  }, [pageStar, pagination.registersPerPage, pagination.totalItems]);

  return {
    handlePreviousPage,
    handleNextPage,
    previousPages,
    nextPages,
    pageStar,
    pageEnd,
    siblingsCount,
  };
};

export default usePaginationController;
