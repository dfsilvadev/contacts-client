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
  const { contacts: list } = useAppSelector((state) => state.contact);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const { details: contacts, pagination } = useMemo(
    () => list || { details: [], pagination: {} as PaginationType },
    [list]
  );

  useEffect(() => {
    dispatch(fetchContacts({ page, limit }));
  }, [dispatch, page]);

  return (
    <section className="mx-auto max-w-4xl p-4">
      {/* <Header /> */}
      <Header />

      {/* <Table /> */}
      {contacts.length && <Table {...{ contacts }} />}

      {/* <Pagination /> */}
      {contacts.length && <Pagination {...{ pagination, onChangePage }} />}
    </section>
  );
};

export default ContactsContent;
