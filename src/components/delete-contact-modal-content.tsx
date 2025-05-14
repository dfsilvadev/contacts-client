import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";

import { Button } from ".";

interface Dependencies {
  readonly contactName: string;
}
const DeleteContactModalContent = ({ contactName }: Dependencies) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Dialog.Title className="m-0 text-2xl text-slate-100">
          Tem certeza que deseja remover <br />
          <span className="text-red-500">{contactName}</span>?
        </Dialog.Title>

        <Dialog.Close asChild>
          <Button aria-label="Close" type="button" size="sm" variant="icon">
            <X />
          </Button>
        </Dialog.Close>
      </div>

      <Dialog.Description className="px-0 pt-5 pb-2.5 text-sm text-slate-500">
        Esta ação não poderá ser desfeita!
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
  );
};

export default DeleteContactModalContent;
