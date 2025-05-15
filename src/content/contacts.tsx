import { useEffect, useMemo, useState } from "react";

import { Header, Pagination, Table } from "@/components";

import { fetchContacts } from "@/features/contacts/slices/contactSlice";

import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";

import type { Pagination as PaginationType } from "@/data/models/contact";
import { fetchCategories } from "@/features/categories/slice/categorySlice";

const ContactsContent = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const dispatch = useAppDispatch();
  const { list: allContacts } = useAppSelector((state) => state.contact);
  const { list: allCategories } = useAppSelector((state) => state.category);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const { details: contacts, pagination } = useMemo(
    () => allContacts || { details: [], pagination: {} as PaginationType },
    [allContacts]
  );

  const categories = useMemo(
    () => allCategories?.details || [],
    [allCategories]
  );

  useEffect(() => {
    dispatch(fetchContacts({ page, limit }));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="mx-auto max-w-4xl p-4">
      {/* <Header /> */}
      <Header {...{ categories }} />

      {/* <Table /> */}
      {Array.isArray(contacts) && contacts.length > 0 && (
        <Table {...{ contacts, categories }} />
      )}

      {/* <Pagination /> */}
      {Array.isArray(contacts) && contacts.length && (
        <Pagination {...{ pagination, onChangePage }} />
      )}
    </section>
  );
};

export default ContactsContent;
