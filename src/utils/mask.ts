import type { FormEvent } from "react";

function maskPhone(evt: FormEvent<HTMLInputElement>) {
  let value = evt.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  evt.currentTarget.value = value;

  return evt;
}

export { maskPhone };
