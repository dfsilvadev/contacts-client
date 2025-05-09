import * as Dialog from "@radix-ui/react-dialog";
import { FunnelSimple, Plus } from "phosphor-react";
import { useState } from "react";

import { Button, ContactForm, Modal } from ".";
import SearchField from "./search-field";

const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  function toggleModal() {
    setOpenModal((prevState) => !prevState);
  }

  return (
    <>
      {/* <header /> */}
      <header className="flex flex-col items-center justify-between py-4 sm:flex-row">
        <h1 className="text-2xl">Contatos</h1>

        <div className="flex items-center gap-2 p-2">
          <SearchField />
          <Button variant="icon">
            <FunnelSimple weight="bold" />
          </Button>
          <Button onClick={toggleModal}>
            <Plus weight="bold" />
            Novo contato
          </Button>
        </div>
      </header>

      {/* <Modal /> */}
      <Dialog.Root
        open={openModal}
        onOpenChange={() => setOpenModal((prevState) => !prevState)}
      >
        <Modal>
          <ContactForm />
        </Modal>
      </Dialog.Root>
    </>
  );
};

export default Header;
