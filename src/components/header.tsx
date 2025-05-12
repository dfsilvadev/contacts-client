import * as Dialog from "@radix-ui/react-dialog";
import { FunnelSimple, Plus } from "phosphor-react";
import { useState } from "react";

import { Button, ContactForm, Modal } from ".";
import SearchField from "./search-field";

const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const title = "Adicionar Novo Contato";
  const description =
    " Preencha os campos abaixo para adicionar um novo contato.";

  function toggleModal() {
    setOpenModal((prevState) => !prevState);
  }

  return (
    <>
      {/* <header /> */}
      <header className="flex flex-col justify-between py-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl">Contatos</h1>

        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:pt-0">
          <SearchField />

          <div className="flex min-w-50 gap-2">
            <Button variant="icon">
              <FunnelSimple weight="bold" />
            </Button>
            <Button onClick={toggleModal}>
              <Plus weight="bold" />
              Novo contato
            </Button>
          </div>
        </div>
      </header>

      {/* <Modal /> */}
      <Dialog.Root
        open={openModal}
        onOpenChange={() => setOpenModal((prevState) => !prevState)}
      >
        <Modal>
          <ContactForm {...{ title, description }} />
        </Modal>
      </Dialog.Root>
    </>
  );
};

export default Header;
