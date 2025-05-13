import * as Dialog from "@radix-ui/react-dialog";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { DotsThreeVertical, PencilLine, Trash } from "phosphor-react";
import { useReducer } from "react";

import { Button, ContactForm, Modal } from "..";
import DeleteContactModalContent from "../delete-contact-modal-content";

const initialState: ModalState = {
  edit: { open: false, contactId: null },
  delete: { open: false, contactId: null },
};

interface ModalState {
  edit: { open: boolean; contactId: string | null };
  delete: { open: boolean; contactId: string | null };
}

type ModalAction = {
  type: "TOGGLE_MODAL";
  modal: keyof ModalState;
  contactId: string | null;
};

interface Dependencies {
  readonly contactId: string;
}

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        [action.modal]: {
          open: !state[action.modal].open,
          contactId: action.contactId,
        },
      };

    default:
      return state;
  }
};

const DropdownActions = ({ contactId }: Dependencies) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  const title = "Editar Contato";
  const description = "Altere os campos abaixo para editar o contato.";

  const toggleModal = (modal: keyof ModalState, contactId: string | null) => {
    dispatch({ type: "TOGGLE_MODAL", modal, contactId });
  };

  return (
    <>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <Button variant="ghost" size="sm">
            <DotsThreeVertical size={20} />
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Portal>
          <Dropdown.Content
            className="w-20 rounded-md bg-gray-800 p-2 shadow-md"
            sideOffset={5}
          >
            {/* Edit Contact */}
            <Dropdown.Item
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md p-2 text-sm text-gray-400 hover:bg-gray-800"
              onClick={() => toggleModal("edit", contactId)}
            >
              <PencilLine size={15} />
            </Dropdown.Item>

            {/* Delete Contact */}
            <Dropdown.Item
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md p-2 text-sm text-gray-400 hover:bg-gray-800"
              onClick={() => toggleModal("delete", contactId)}
            >
              <Trash size={15} />
            </Dropdown.Item>

            <Dropdown.Arrow className="fill-gray-800" />
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>

      {/* <Modal Edit/> */}
      <Dialog.Root
        open={modalState.edit.open}
        onOpenChange={() => toggleModal("edit", null)}
      >
        <Modal>
          <ContactForm
            {...{ title, description, contactId: modalState.edit.contactId }}
          />
        </Modal>
      </Dialog.Root>

      {/* <Modal Delete/> */}
      <Dialog.Root
        open={modalState.delete.open}
        onOpenChange={() => toggleModal("delete", null)}
      >
        <Modal>
          <DeleteContactModalContent />
        </Modal>
      </Dialog.Root>
    </>
  );
};

export default DropdownActions;
