import * as Dialog from "@radix-ui/react-dialog";
import { WarningOctagon, X } from "phosphor-react";
import { useEffect, useState } from "react";

import {
  Button,
  ContactForm,
  Header,
  Modal,
  Pagination,
  Table,
} from "@/components";

import { fetchContacts } from "@/features/contacts/slices/contactSlices";

import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";

import { fetchCategories } from "@/features/categories/slice/categorySlices";
import { closeModal } from "@/features/ui/slices/uiSlices";

const ContactsContent = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contact.list?.details ?? []);
  const pagination = useAppSelector((state) => state.contact.list?.pagination);
  const categories = useAppSelector(
    (state) => state.category.list?.details ?? []
  );
  const { isOpen, modalContent, modalType } = useAppSelector(
    (state) => state.ui
  );

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(fetchContacts({ page, limit }));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="mx-auto max-w-4xl p-4">
      {/* <Header /> */}
      <Header />

      {/* <Table /> */}
      {Array.isArray(contacts) && contacts.length > 0 && (
        <Table {...{ contacts, categories }} />
      )}

      {/* <Pagination /> */}
      {contacts.length && pagination && (
        <Pagination {...{ pagination, onChangePage }} />
      )}

      {/* Modal */}
      <Dialog.Root open={isOpen} onOpenChange={() => dispatch(closeModal())}>
        <Modal>
          {modalType === "create" && (
            <>
              <Dialog.Title className="text-lg font-semibold text-slate-50">
                {modalContent?.title}
              </Dialog.Title>

              <Dialog.Description className="mt-2 text-sm text-gray-400">
                {modalContent?.description}
              </Dialog.Description>
              <ContactForm {...{ categories }} />
            </>
          )}

          {modalType === "edit" && (
            <>
              <Dialog.Title className="text-lg font-semibold text-slate-50">
                {modalContent?.title}
              </Dialog.Title>

              <Dialog.Description className="mt-2 text-sm text-gray-400">
                {modalContent?.description}
              </Dialog.Description>
              <ContactForm
                {...{
                  categories,
                  contact: modalContent?.contact,
                }}
              />
            </>
          )}

          {modalType === "delete" && (
            <>
              <div className="flex items-start justify-between">
                <Dialog.Title className="m-0 text-2xl text-slate-100">
                  {modalContent?.title} <br />
                  {
                    <span className="text-slate-400">
                      {`"${modalContent?.contact?.name}"`}
                    </span>
                  }
                  ?
                </Dialog.Title>

                <Dialog.Close asChild>
                  <Button
                    aria-label="Close"
                    type="button"
                    size="sm"
                    variant="icon"
                  >
                    <X />
                  </Button>
                </Dialog.Close>
              </div>

              <Dialog.Description className="flex items-center gap-2 px-0 pt-5 pb-2.5 text-xs text-yellow-600">
                <WarningOctagon size={18} />
                {modalContent?.description}
              </Dialog.Description>

              <div className="flex items-center justify-end">
                <div className="flex gap-2">
                  <Dialog.Close asChild>
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                  </Dialog.Close>

                  <Button variant="destructive" size="sm">
                    Deletar
                  </Button>
                </div>
              </div>
            </>
          )}
        </Modal>
      </Dialog.Root>
    </section>
  );
};

export default ContactsContent;
