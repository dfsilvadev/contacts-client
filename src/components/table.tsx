/* eslint-disable no-constant-condition */
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import {
  CaretDown,
  CaretUp,
  DotsThreeVertical,
  PencilLine,
  Trash,
} from "phosphor-react";
import { memo } from "react";

import { Badge, Button } from ".";

import type { Contact } from "@/data/models/contact";

import useModalController from "@/hooks/useModalController";

import dateHelper from "@/libs/helpers/dateHelperConfiguration";
import { formatPhoneNumber } from "@/libs/helpers/mask";
import { handleCategories } from "@/libs/utils/common/constant/handleCategories";

interface Dependencies {
  readonly contacts: Contact[];
}

const Table = ({ contacts }: Dependencies) => {
  const { modalConfig, handleOpenModal } = useModalController();

  return (
    <div className="mt-4">
      <div className="flex w-full flex-col gap-4">
        <div className="w-full overflow-x-auto py-2">
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
                  <td className="bg-gray-900 px-2 py-2">
                    {formatPhoneNumber(contact.phone)}
                  </td>
                  <td className="bg-gray-900 px-2 py-2">{contact.email}</td>
                  <td className="bg-gray-900 px-2 py-2">
                    <Badge>{handleCategories[contact.categoryLabel]}</Badge>
                  </td>
                  <td className="bg-gray-900 px-2 py-2">
                    {dateHelper.formatDate(contact.createdAt)}
                  </td>

                  <td className="rounded-r-sm bg-gray-900 px-2 py-2">
                    <Dropdown.Root>
                      <Dropdown.Trigger asChild>
                        <Button variant="ghost" size="sm">
                          <DotsThreeVertical size={20} />
                        </Button>
                      </Dropdown.Trigger>

                      <Dropdown.Portal>
                        <Dropdown.Content
                          className="w-20 rounded-md bg-gray-800 p-2 shadow-md"
                          sideOffset={5}
                        >
                          {/* Edit Contact */}
                          <Dropdown.Item
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-md p-2 text-sm text-gray-400 hover:bg-gray-800"
                            onClick={() =>
                              handleOpenModal({
                                type: "edit",
                                content: modalConfig.handler("edit")(contact),
                              })
                            }
                          >
                            <PencilLine size={15} />
                          </Dropdown.Item>

                          {/* Delete Contact */}
                          <Dropdown.Item
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-md p-2 text-sm text-gray-400 hover:bg-gray-800"
                            onClick={() =>
                              handleOpenModal({
                                type: "delete",
                                content: modalConfig.handler("delete")(contact),
                              })
                            }
                          >
                            <Trash size={15} />
                          </Dropdown.Item>

                          <Dropdown.Arrow className="fill-gray-800" />
                        </Dropdown.Content>
                      </Dropdown.Portal>
                    </Dropdown.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(Table);
