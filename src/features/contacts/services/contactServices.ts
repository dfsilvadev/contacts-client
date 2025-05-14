import { axios } from "@/libs/axios/axiosInstance";

import type {
  Contact,
  ContactResponse,
  NewContact,
} from "@/data/models/contact";
import type { ErrorResponse } from "@/data/models/erros";

const findAll = async (page = 1, limit = 10) => {
  try {
    const { data } = await axios.get<
      ContactResponse<Contact[]> | ErrorResponse
    >(`/contacts?page=${page}&limit=${limit}`);

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
  }
};

const findOne = async (contactId: string) => {
  try {
    const { data } = await axios.get<ContactResponse<Contact> | ErrorResponse>(
      `/contacts/${contactId}`
    );

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
  }
};

const create = async (contact: NewContact) => {
  try {
    const { data } = await axios.post<ContactResponse<Contact> | ErrorResponse>(
      "/contacts",
      contact
    );

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
  }
};

const contactService = {
  findAll,
  findOne,
  create,
};

export default contactService;
