type Id = string;

export type Category = {
  id: Id;
  name: string;
};

export type CategoriesResponse<T> = {
  readonly details: T;
  readonly status: string;
};
