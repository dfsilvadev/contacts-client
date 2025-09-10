import { useCallback, useEffect, useState } from "react";

import { fetchCategories } from "@/features/categories/slice/categorySlices";
import {
  selectCategoriesDetails,
  selectContactDetails,
  selectContactDetailsPagination,
} from "@/features/contacts/selectors/contactSelectors";
import {
  deleteContact,
  fetchContacts,
} from "@/features/contacts/slices/contactSlices";
import { closeModal } from "@/features/ui/slices/uiSlices";

import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { checkAndRunPostAction } from "@/libs/redux/checkAndRunPostAction";

const useContactsContentController = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContactDetails);
  const pagination = useAppSelector(selectContactDetailsPagination);
  const categories = useAppSelector(selectCategoriesDetails);
  const { isOpen, modalContent, modalType } = useAppSelector(
    (state) => state.ui
  );

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleFetchContacts = useCallback(
    async () => dispatch(fetchContacts({ page, limit })),
    [dispatch, page, limit]
  );

  const handleDeleteContact = async (contactId?: string) => {
    if (!contactId) return;

    const action = await dispatch(deleteContact({ contactId }));

    checkAndRunPostAction(deleteContact, action, () => {
      handleFetchContacts();
      dispatch(closeModal());
    });
  };

  const handleOnOpenChange = () => dispatch(closeModal());

  useEffect(() => {
    handleFetchContacts();
  }, [handleFetchContacts]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return {
    contacts,
    pagination,
    categories,
    isOpen,
    modalContent,
    modalType,
    onChangePage,
    handleFetchContacts,
    handleDeleteContact,
    handleOnOpenChange,
  };
};

export default useContactsContentController;
