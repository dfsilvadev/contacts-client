import * as Dialog from "@radix-ui/react-dialog";
import { WarningOctagon, X } from "phosphor-react";

import {
  Button,
  ContactForm,
  Header,
  Modal,
  Pagination,
  Table,
} from "@/components";

import useContactsContentController from "./hooks/useContactsContentController";

const ContactsContent = () => {
  const {
    contacts,
    pagination,
    categories,
    isOpen,
    modalContent,
    modalType,
    onChangePage,
    handleDeleteContact,
    handleOnOpenChange,
  } = useContactsContentController();

  return (
    <section className="mx-auto max-w-4xl p-4">
      {/* <Header /> */}
      <Header />

      {/* <Table /> */}
      {contacts.length > 0 && <Table {...{ contacts, categories }} />}

      {/* Empty contacts */}
      {contacts.length === 0 && (
        <div className="mt-6 flex h-full items-center justify-center rounded-sm bg-gray-900 p-4 text-sm text-gray-400">
          Nenhum contato encontrado.
        </div>
      )}

      {/* <Pagination /> */}
      {contacts.length > 0 && pagination && (
        <Pagination {...{ pagination, onChangePage }} />
      )}

      {/* Modal */}
      <Dialog.Root open={isOpen} onOpenChange={handleOnOpenChange}>
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

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleDeleteContact(modalContent?.contact?.id)
                    }
                  >
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
