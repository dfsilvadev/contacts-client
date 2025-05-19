import * as Dialog from "@radix-ui/react-dialog";

import ContactForm from "./contact-form";

import type { Category } from "@/data/models/category";

import type { Contact } from "@/data/models/contact";
import type { ModalContent } from "@/features/ui/slices/uiSlices";

interface Dependencies {
  readonly modalContent: ModalContent | null;
  readonly categories: Category[];
  readonly contact?: Contact | null;
}

const FormContactModalBody = ({
  modalContent,
  contact,
  categories,
}: Dependencies) => {
  return (
    <>
      <Dialog.Title className="text-lg font-semibold text-slate-50">
        {modalContent?.title}
      </Dialog.Title>

      <Dialog.Description className="mt-2 text-sm text-gray-400">
        {modalContent?.description}
      </Dialog.Description>

      <ContactForm {...{ categories, contact }} />
    </>
  );
};

export default FormContactModalBody;
