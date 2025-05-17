import type { ContactFormData } from "@/components/contact-form";

type Id = string;

export type NewContact = ContactFormData;

export type Contact = {
  readonly id: Id;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly categoryId: string;
  readonly categoryLabel: string;
  readonly createdAt: string;
  readonly updatedAt: string | null;
};

export type Pagination = {
  readonly totalItems: number;
  readonly totalPages: number;
  readonly registersPerPage: number;
  readonly currentPage: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly nextPage: number;
  readonly previousPage: number;
  readonly firstPage: number;
  readonly lastPage: number;
};

export type ContactResponse<T> = {
  readonly details: T;
  readonly pagination: Pagination;
  readonly status: string;
};
