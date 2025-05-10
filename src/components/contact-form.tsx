/* eslint-disable no-console */
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Select, TextField } from ".";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve conter um mínimo de 3 letras." }),
  email: z.string().email("Este e-mail não é válido."),
  phone: z.string().min(12, { message: "Telefone inválido." }),
  categoryId: z.string().min(1, { message: "Selecione uma categoria." }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface Dependencies {
  readonly title: string;
  readonly description: string;
}

const ContactForm = ({ title, description }: Dependencies) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormData): void => {
    console.log(data);
    reset();
  };

  return (
    <form
      className="flex flex-col items-stretch justify-stretch"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Dialog.Title className="text-lg font-semibold text-slate-50">
        {title}
      </Dialog.Title>

      <Dialog.Description className="mt-2 text-sm text-gray-400">
        {description}
      </Dialog.Description>

      <div className="mt-4 flex gap-2">
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

      <div className="mt-4 flex gap-2">
        <TextField
          type="text"
          placeholder="(XX) XXXXX-XXXX"
          label="Telefone"
          mask="phone"
          {...register("phone")}
        />
        <Select
          label="Categoria"
          options={[
            { id: "1", name: "Family" },
            { id: "2", name: "Friend" },
            { id: "3", name: "Other" },
          ]}
          {...register("categoryId")}
          name={register("categoryId").name}
          onChange={register("categoryId").onChange}
        />
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
