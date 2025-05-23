import { Plus } from "phosphor-react";

import { Button } from ".";

import useModalController from "@/hooks/useModalController";

const Header = () => {
  const { modalConfig, handleOpenModal } = useModalController();

  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-2xl">Contatos</h1>

      <div className="flex min-w-50 gap-2">
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
    </header>
  );
};

export default Header;
