import type { PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import type { Contact } from "@/data/models/contact";

import useAppDispatch from "@/hooks/useAppDispatch";

import {
  formatPhoneNumber,
  removePhoneMaskForDatabase,
} from "@/libs/helpers/mask";
import { checkAndRunPostAction } from "@/libs/redux/checkAndRunPostAction";

import {
  createContact,
  fetchContacts,
  updateContact,
} from "@/features/contacts/slices/contactSlices";
import { closeModal } from "@/features/ui/slices/uiSlices";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve conter um mínimo de 3 letras." }),
  email: z.string().email("Este e-mail não é válido."),
  phone: z.string().min(12, { message: "Telefone inválido." }),
  categoryId: z.string().min(1, { message: "Selecione uma categoria." }),
});

export type ContactFormDataSchema = z.infer<typeof contactFormSchema>;

interface Dependencies {
  readonly contact?: Contact | null;
}

const useContactFormController = ({ contact }: Dependencies) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<ContactFormDataSchema>({
    resolver: zodResolver(contactFormSchema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: ContactFormDataSchema): Promise<void> => {
    const formattedData = {
      ...data,
      phone: removePhoneMaskForDatabase(data.phone),
    };
    let action: PayloadAction<unknown>;

    if (contact && contact.id) {
      action = await dispatch(
        updateContact({ contact: formattedData, contactId: contact.id })
      );
      checkAndRunPostAction(updateContact, action, () => {
        dispatch(fetchContacts({ page: 1, limit: 10 }));
        reset();
        dispatch(closeModal());
      });

      return;
    }

    action = await dispatch(createContact({ contact: formattedData }));
    checkAndRunPostAction(createContact, action, () => {
      dispatch(fetchContacts({ page: 1, limit: 10 }));
      reset();
      dispatch(closeModal());
    });
  };

  useEffect(() => {
    if (contact) {
      reset({
        name: contact.name,
        email: contact.email,
        phone: formatPhoneNumber(contact.phone),
        categoryId: contact.categoryId,
      });
    }
  }, [contact, reset]);

  return {
    register,
    handleSubmit,
    isSubmitting,
    isValid,
    onSubmit,
  };
};

export default useContactFormController;
