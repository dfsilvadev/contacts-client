import * as Dialog from "@radix-ui/react-dialog";
import { WarningOctagon, X } from "phosphor-react";

import { Button } from "@/components";
import type { ModalContent } from "@/features/ui/slices/uiSlices";

interface Dependencies {
  readonly modalContent: ModalContent;
  readonly handleDeleteContact: (
    contactId: string | undefined
  ) => Promise<void>;
}

const EditContactModalBody = ({
  modalContent,
  handleDeleteContact,
}: Dependencies) => {
  return (
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
          <Button aria-label="Close" type="button" size="sm" variant="icon">
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
            onClick={() => handleDeleteContact(modalContent?.contact?.id)}
          >
            Deletar
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditContactModalBody;
