import { useEffect, useState } from "react";

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

  const handleDeleteContact = async (contactId?: string) => {
    if (!contactId) return;

    const action = await dispatch(deleteContact({ contactId }));

    checkAndRunPostAction(deleteContact, action, () => {
      dispatch(fetchContacts({ page, limit }));
      dispatch(closeModal());
    });
  };

  const handleOnOpenChange = () => dispatch(closeModal());

  useEffect(() => {
    dispatch(fetchContacts({ page, limit }));
  }, [page, dispatch]);

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
    handleDeleteContact,
    handleOnOpenChange,
  };
};

export default useContactsContentController;
