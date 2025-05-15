import { axios } from "@/libs/axios/axiosInstance";

import type {
  Contact,
  ContactResponse,
  NewContact,
} from "@/data/models/contact";

class ContactService {
  async findAll({ page = 1, limit = 10, endpoint = "/contacts" }) {
    const { data } = await axios.get<ContactResponse<Contact[]>>(
      `${endpoint}?page=${page}&limit=${limit}`
    );
    return data;
  }

  async findOne({
    contactId,
    endpoint = "/contacts",
  }: {
    contactId: string;
    endpoint?: string;
  }) {
    const { data } = await axios.get<ContactResponse<Contact>>(
      `${endpoint}/${contactId}`
    );
    return data;
  }

  async create({
    contact,
    endpoint = "/contacts",
  }: {
    contact: NewContact;
    endpoint?: string;
  }) {
    const { data } = await axios.post<ContactResponse<Contact>>(
      `${endpoint}`,
      contact
    );
    return data;
  }
}

export { ContactService };
