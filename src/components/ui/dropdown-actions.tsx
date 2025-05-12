import * as Dialog from "@radix-ui/react-dialog";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { DotsThreeVertical, PencilLine, Trash } from "phosphor-react";
import { useReducer } from "react";

import { Button, ContactForm, Modal } from "..";
import DeleteContactModalContent from "../delete-contact-modal-content";

const initialState: ModalState = {
  edit: { open: false, userId: null },
  delete: { open: false, userId: null },
};

interface ModalState {
  edit: { open: boolean; userId: string | null };
  delete: { open: boolean; userId: string | null };
}

interface ModalAction {
  type: "TOGGLE_MODAL";
  modal: keyof ModalState;
}

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        [action.modal]: { open: !state[action.modal].open, userId: null },
      };

    default:
      return state;
  }
};

const DropdownActions = () => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  const title = "Editar Contato";
  const description = "Altere os campos abaixo para editar o contato.";

  const toggleModal = (modal: keyof ModalState) => {
    dispatch({ type: "TOGGLE_MODAL", modal });
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
              onClick={() => toggleModal("edit")}
            >
              <PencilLine size={15} />
            </Dropdown.Item>

            {/* Delete Contact */}
            <Dropdown.Item
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md p-2 text-sm text-gray-400 hover:bg-gray-800"
              onClick={() => toggleModal("delete")}
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
        onOpenChange={() => toggleModal("edit")}
      >
        <Modal>
          <ContactForm {...{ title, description }} />
        </Modal>
      </Dialog.Root>

      {/* <Modal Delete/> */}
      <Dialog.Root
        open={modalState.delete.open}
        onOpenChange={() => toggleModal("delete")}
      >
        <Modal>
          <DeleteContactModalContent />
        </Modal>
      </Dialog.Root>
    </>
  );
};

export default DropdownActions;
