export type Id = string;

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
