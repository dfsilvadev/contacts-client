import { CaretLeft, CaretRight } from "phosphor-react";

import { Button } from "@/components";

import usePaginationController from "./hooks/usePaginationController";

import type { Pagination as PaginationType } from "@/data/models/contact";

interface Dependencies {
  readonly pagination: PaginationType;
  readonly onChangePage: (page: number) => void;
}

const Pagination = ({ pagination, onChangePage }: Dependencies) => {
  const {
    handlePreviousPage,
    handleNextPage,
    previousPages,
    nextPages,
    pageStar,
    pageEnd,
    siblingsCount,
  } = usePaginationController({ pagination, onChangePage });

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
              onClick={handlePreviousPage}
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
              onClick={handleNextPage}
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
