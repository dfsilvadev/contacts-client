import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

interface Dependencies {
  readonly children: ReactNode;
}

const Modal = ({ children }: Dependencies) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/65" />
      <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-900 p-6 shadow-lg">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default Modal;
