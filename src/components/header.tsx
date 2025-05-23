import { Plus } from "phosphor-react";

import { Button, PopoverFilter } from ".";
import SearchField from "./search-field";

import useModalController from "@/hooks/useModalController";

const Header = () => {
  const { modalConfig, handleOpenModal } = useModalController();

  return (
    <header className="flex flex-col justify-between py-4 sm:flex-row sm:items-center">
      <h1 className="text-2xl">Contatos</h1>

      <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:pt-0">
        <SearchField />

        <div className="flex min-w-50 gap-2">
          <PopoverFilter />

          <Button
            onClick={() =>
              handleOpenModal({
                type: "create",
                content: modalConfig.handler("create")(),
              })
            }
          >
            <Plus weight="bold" />
            Novo contato
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
