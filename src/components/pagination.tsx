import { CaretLeft, CaretRight } from "phosphor-react";
import { useMemo } from "react";

import { Button } from "@/components";

import type { Pagination as PaginationType } from "@/data/models/contact";

interface Dependencies {
  readonly pagination: PaginationType;
  readonly onChangePage: (page: number) => void;
}

const Pagination = ({ pagination, onChangePage }: Dependencies) => {
  const siblingsCount = 1;

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
  const pageEnd = useMemo(
    () => pageStar + Number(pagination.registersPerPage) - 1,
    [pageStar, pagination.registersPerPage]
  );

  return (
    <footer>
      <div className="flex items-center justify-between py-4">
        <span className="text-sm text-gray-400">
          {pageStar} a {pageEnd} de {pagination.totalItems} contatos
        </span>

        {pagination.totalPages > 1 && (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPreviousPage}
            >
              <CaretLeft size={10} />
            </Button>

            {pagination.currentPage > 1 + siblingsCount && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onChangePage(1)}
                >
                  1
                </Button>
                {pagination.currentPage > 2 + siblingsCount && (
                  <span className="text-sm text-gray-400">...</span>
                )}
              </>
            )}

            {previousPages.length > 0 &&
              previousPages.map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  className={
                    pagination.currentPage === page
                      ? "bg-blue-500 text-white"
                      : ""
                  }
                  onClick={() => onChangePage(page)}
                >
                  {page}
                </Button>
              ))}

            <Button
              variant="outline"
              size="sm"
              className="bg-blue-500 text-white"
              onClick={() => onChangePage(pagination.currentPage)}
            >
              {pagination.currentPage}
            </Button>

            {nextPages.length > 0 &&
              nextPages.map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  className={
                    pagination.currentPage === page
                      ? "bg-blue-500 text-white"
                      : ""
                  }
                  onClick={() => onChangePage(page)}
                >
                  {page}
                </Button>
              ))}

            {pagination.currentPage + siblingsCount < pagination.lastPage && (
              <>
                {pagination.currentPage + 1 + siblingsCount <
                  pagination.lastPage && (
                  <span className="text-sm text-gray-400">...</span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onChangePage(pagination.lastPage)}
                >
                  {pagination.lastPage}
                </Button>
              </>
            )}

            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNextPage}
            >
              <CaretRight size={10} />
            </Button>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Pagination;
