import { useAuth0 } from "@auth0/auth0-react";
import { Plus, SignOut } from "phosphor-react";

import { Button } from ".";

import useModalController from "@/hooks/useModalController";

const Header = () => {
  const { modalConfig, handleOpenModal } = useModalController();
  const { logout } = useAuth0();

  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-2xl">Contatos</h1>

      <div className="flex min-w-50 gap-2">
        <Button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <SignOut weight="bold" />
          Sair
        </Button>

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
