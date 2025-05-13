import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Select, TextField } from ".";

import { fetchContactById } from "@/features/contacts/slices/contactSlice";

import { fetchCategories } from "@/features/categories/slice/categorySlice";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";

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
  readonly contactId: string | null;
}

const ContactForm = ({ title, description, contactId }: Dependencies) => {
  const dispatch = useAppDispatch();
  const { contactById: currentContact } = useAppSelector(
    (state) => state.contact
  );
  const { categories } = useAppSelector((state) => state.category);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormData): void => {
    // eslint-disable-next-line no-console
    console.log(data);
    reset();
  };

  useEffect(() => {
    const controller = new AbortController();
    if (contactId) {
      dispatch(fetchContactById({ contactId }));
    }

    return () => controller.abort();
  }, [contactId, dispatch]);

  useEffect(() => {
    if (currentContact) {
      reset({
        name: currentContact.details.name,
        email: currentContact.details.email,
        phone: currentContact.details.phone,
        categoryId: currentContact.details.categoryId,
      });
    }

    return () => {
      reset();
    };
  }, [currentContact, reset]);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchCategories());
    return () => controller.abort();
  }, [dispatch]);

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
        <Select
          label="Categoria"
          options={categories?.details || []}
          {...register("categoryId")}
          name={register("categoryId").name}
          onChange={register("categoryId").onChange}
          value={currentContact?.details.categoryId}
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
