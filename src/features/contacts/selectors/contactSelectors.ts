import type { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectContactDetails = createSelector(
  (state: RootState) => state.contact.list?.details,
  (details) => details ?? []
);

const selectContactDetailsPagination = createSelector(
  (state: RootState) => state.contact.list?.pagination,
  (pagination) =>
    pagination ?? {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      registersPerPage: 10,
      hasNextPage: false,
      hasPreviousPage: false,
      nextPage: 1,
      previousPage: 1,
      firstPage: 1,
      lastPage: 1,
    }
);

const selectCategoriesDetails = createSelector(
  (state: RootState) => state.category.list?.details,
  (categories) => categories ?? []
);

export {
  selectCategoriesDetails,
  selectContactDetails,
  selectContactDetailsPagination,
};
