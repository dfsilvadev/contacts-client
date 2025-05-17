import type { FormEvent } from "react";

function applyPhoneMask(evt: FormEvent<HTMLInputElement>) {
  let value = evt.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  evt.currentTarget.value = value;

  return evt;
}

function removePhoneMaskForDatabase(phoneNumberValue: string) {
  return phoneNumberValue.replace(/[()\-\s]/g, "");
}

function formatPhoneNumber(phoneNumber: string): string {
  let value = phoneNumber.replace(/\D/g, "");

  value = value.replace(/^(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");

  return value;
}

export { applyPhoneMask, formatPhoneNumber, removePhoneMaskForDatabase };
