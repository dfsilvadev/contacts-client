import { useState, type FormEvent } from "react";

import { selectCategoriesDetails } from "@/features/contacts/selectors/contactSelectors";
import { filterContacts } from "@/features/contacts/slices/contactSlices";

import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";

import type { DateRangeInput } from "./useDateRageController";

const usePopoverFilterController = () => {
  const [categoryId, setCategoryId] = useState<string>("");
  const categories = useAppSelector(selectCategoriesDetails);

  const dispatch = useAppDispatch();

  const handleChangeCategoryId = (categoryId: string | null) => {
    if (!categoryId) return false;
    setCategoryId(categoryId);
    return true;
  };

  const formatDateRangeForBackend = (range: DateRangeInput[]) => {
    const [selection] = range;

    if (!selection?.startDate || !selection?.endDate) {
      throw new Error(
        "As datas de início e fim devem ser preenchidas corretamente."
      );
    }

    return {
      startDate: new Date(selection.startDate).toISOString().split("T")[0],
      endDate: new Date(selection.endDate).toISOString().split("T")[0],
    };
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    dateFilter: DateRangeInput[]
  ) => {
    e.preventDefault();

    const payload: Parameters<typeof filterContacts>[0] = {
      page: 1,
      limit: 10,
      categoryId,
    };

    const [selection] = dateFilter;

    const hasDateRange = selection?.startDate && selection?.endDate;

    if (hasDateRange) {
      try {
        const { startDate, endDate } = formatDateRangeForBackend(dateFilter);
        payload.createdAtStart = startDate;
        payload.createdAtEnd = endDate;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Erro ao formatar datas para filtro:", error);
        return;
      }
    }

    dispatch(filterContacts(payload));
  };

  return {
    categoryId,
    categories,
    handleChangeCategoryId,
    handleSubmit,
  };
};

export default usePopoverFilterController;
