import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { Check } from "phosphor-react";

import { Button, Select as SelectField, TextField } from ".";

import type { Category } from "@/data/models/category";
import type { Contact } from "@/data/models/contact";

import useContactFormController from "./hooks/useContactFormController";

import { handleCategories } from "@/libs/utils/common/constant/handleCategories";

interface Dependencies {
  readonly contact?: Contact | null;
  readonly categories: Category[];
}

const ContactForm = ({ contact, categories }: Dependencies) => {
  const { register, handleSubmit, isSubmitting, isValid, onSubmit } =
    useContactFormController({ contact });

  return (
    <form
      className="flex flex-col items-stretch justify-stretch"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <TextField
          type="text"
          placeholder="John Doe"
          label="Nome"
          autoFocus
          {...register("name")}
        />
        <TextField
          type="email"
          placeholder="john.doe@email.com"
          label="E-mail"
          {...register("email")}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <TextField
          type="text"
          placeholder="(XX) XXXXX-XXXX"
          label="Telefone"
          mask="phone"
          {...register("phone")}
        />
        <SelectField
          label="Categoria"
          loading={categories.length <= 0}
          {...register("categoryId")}
          name={register("categoryId").name}
          onChange={register("categoryId").onChange}
          value={contact?.categoryId}
        >
          {categories.map((item) => (
            <Select.Item
              key={item.id}
              value={item.id}
              className="relative flex cursor-pointer items-center justify-between rounded border-transparent px-4 py-2 pr-8 text-sm text-slate-400 data-[highlighted]:bg-transparent data-[highlighted]:text-slate-200"
            >
              <Select.ItemText>{handleCategories[item.name]}</Select.ItemText>
              <Select.ItemIndicator className="absolute right-6">
                <Check weight="bold" className="text-violet-600" />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </SelectField>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <div className="flex gap-2">
          <Dialog.Close asChild>
            <Button variant="destructive" size="sm">
              Cancelar
            </Button>
          </Dialog.Close>

          <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
