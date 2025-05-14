import { useEffect, useMemo, useState } from "react";

import { Header, Pagination, Table } from "@/components";

import { fetchContacts } from "@/features/contacts/slices/contactSlice";

import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";

import type { Pagination as PaginationType } from "@/data/models/contact";

const ContactsContent = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.contact);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const { details: contacts, pagination } = useMemo(
    () => list || { details: [], pagination: {} as PaginationType },
    [list]
  );

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchContacts({ page, limit }));
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <section className="mx-auto max-w-4xl p-4">
      {/* <Header /> */}
      <Header />

      {/* <Table /> */}
      {Array.isArray(contacts) && contacts.length > 0 && (
        <Table {...{ contacts }} />
      )}

      {/* <Pagination /> */}
      {Array.isArray(contacts) && contacts.length && (
        <Pagination {...{ pagination, onChangePage }} />
      )}
    </section>
  );
};

export default ContactsContent;
