import type { ModalType } from "@/features/ui/slices/uiSlices";

import type { Contact } from "@/data/models/contact";

type ConfigResponse = {
  title: string;
  description: string;
  contact?: Contact;
};

class ModalConfig {
  private data: {
    [key in ModalType]: (contact?: Contact) => ConfigResponse;
  } = {
    edit: (contact) => ({
      title: "Editar Contato",
      description: "Altere os campos abaixo para editar o contato.",
      contact,
    }),
    create: (contact) => ({
      title: "Adicionar Novo Contato",
      description: "Preencha os campos abaixo para adicionar um novo contato.",
      contact,
    }),
    delete: (contact) => ({
      title: "Tem certeza que deseja remover",
      description: "Esta ação não poderá ser desfeita!",
      contact,
    }),
  };

  handler(title: ModalType): (contact?: Contact) => ConfigResponse {
    return this.data[title];
  }
}

export { ModalConfig };
