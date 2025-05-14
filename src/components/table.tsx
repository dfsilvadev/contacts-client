/* eslint-disable no-constant-condition */
import { CaretDown, CaretUp } from "phosphor-react";

import { Badge, DropdownActions } from ".";

import dateHelper from "@/utils/dateHelperConfiguration";

import type { Contact } from "@/data/models/contact";

interface Dependencies {
  contacts: Contact[];
}

const Table = ({ contacts }: Dependencies) => {
  return (
    <div className="mt-4">
      <div className="flex w-full flex-col gap-4">
        <div className="w-full overflow-x-auto py-2">
          {contacts.length > 0 && (
            <table className="w-full min-w-[38rem] table-auto border-separate border-spacing-y-2 text-left">
              <thead className="text-xs text-gray-500 uppercase">
                <tr>
                  <th className="cursor-pointer px-2 py-1">
                    <div className="flex items-center gap-1">
                      Nome
                      <div className="flex flex-col">
                        {true ? (
                          <CaretUp size={10} weight="fill" />
                        ) : (
                          <CaretDown size={10} weight="fill" />
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="px-2 py-1">Telefone</th>
                  <th className="px-2 py-1">E-mail</th>
                  <th className="px-2 py-1">Categorias</th>
                  <th className="px-2 py-1">Adicionado em</th>
                  <th className="px-2 py-1">Ações</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-400">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="shadow-sm">
                    <td className="rounded-l-sm bg-gray-900 px-2 py-3 font-semibold text-slate-50">
                      {contact.name}
                    </td>
                    <td className="bg-gray-900 px-2 py-2">{contact.phone}</td>
                    <td className="bg-gray-900 px-2 py-2">{contact.email}</td>
                    <td className="bg-gray-900 px-2 py-2">
                      <Badge>{contact.categoryLabel}</Badge>
                    </td>
                    <td className="bg-gray-900 px-2 py-2">
                      {dateHelper.formatDate(contact.createdAt)}
                    </td>
                    <td className="rounded-r-sm bg-gray-900 px-2 py-2">
                      <DropdownActions
                        contactId={contact.id}
                        contactName={contact.name}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
