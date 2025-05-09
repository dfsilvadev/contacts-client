import { FunnelSimple, Plus } from "phosphor-react";

import { Button } from ".";
import SearchField from "./search-field";

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-between py-4 sm:flex-row">
      <h1 className="text-2xl">Contatos</h1>

      <div className="flex items-center gap-2 p-2">
        <SearchField />
        <Button variant="icon">
          <FunnelSimple weight="bold" />
        </Button>
        <Button>
          <Plus weight="bold" />
          Novo contato
        </Button>
      </div>
    </header>
  );
};

export default Header;
