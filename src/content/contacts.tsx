import * as Dialog from "@radix-ui/react-dialog";

import {
  EditContactModalBody,
  FormContactModalBody,
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
