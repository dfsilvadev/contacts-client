import * as Dialog from "@radix-ui/react-dialog";

import {
  Button,
  EditContactModalBody,
  FormContactModalBody,
  Header,
  Modal,
  Pagination,
  PopoverFilter,
  SearchField,
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
    handleFetchContacts,
    handleDeleteContact,
    handleOnOpenChange,
  } = useContactsContentController();

  return (
    <section className="mx-auto max-w-4xl p-4">
      {/* <Header /> */}
      <Header />

      <div className="mt-10 flex flex-col">
        {/* Search bar */}
        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:pt-0">
          <SearchField />

          <div className="flex min-w-50 gap-2">
            <PopoverFilter />

            <Button variant="outline" onClick={handleFetchContacts}>
              Limpar filtros
            </Button>
          </div>
        </div>

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
      </div>

      {/* Modal */}
      <Dialog.Root open={isOpen} onOpenChange={handleOnOpenChange}>
        <Modal>
          {modalType === "create" && modalContent && (
            <FormContactModalBody {...{ modalContent, categories }} />
          )}

          {modalType === "edit" && modalContent && (
            <FormContactModalBody
              {...{
                modalContent,
                categories,
                contact: modalContent?.contact,
              }}
            />
          )}

          {modalType === "delete" && modalContent && (
            <EditContactModalBody {...{ modalContent, handleDeleteContact }} />
          )}
        </Modal>
      </Dialog.Root>
    </section>
  );
};

export default ContactsContent;
