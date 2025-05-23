import { axios } from "@/libs/axios/axiosInstance";

import type {
  Contact,
  ContactFormData,
  ContactResponse,
} from "@/data/models/contact";

class ContactServices {
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
    contact: ContactFormData;
    endpoint?: string;
  }) {
    const { data } = await axios.post<ContactResponse<Contact>>(
      `${endpoint}`,
      contact
    );
    return data;
  }

  async update({
    contact,
    contactId,
    endpoint = "/contacts",
  }: {
    contact: ContactFormData;
    contactId: string;
    endpoint?: string;
  }) {
    const { data } = await axios.put<ContactResponse<Contact>>(
      `${endpoint}/${contactId}`,
      contact
    );
    return data;
  }

  async delete({
    contactId,
    endpoint = "/contacts",
  }: {
    contactId: string;
    endpoint?: string;
  }) {
    await axios.delete(`${endpoint}/${contactId}`);
  }

  async search({
    page = 1,
    limit = 10,
    query,
    endpoint = "/contacts",
  }: {
    page: number;
    limit: number;
    query: string;
    endpoint?: string;
  }) {
    const { data } = await axios.get<ContactResponse<Contact[]>>(
      `${endpoint}?name=${query}&page=${page}&limit=${limit}`
    );
    return data;
  }

  async filter({
    page = 1,
    limit = 10,
    categoryId,
    createdAtStart,
    createdAtEnd,
    endpoint = "/contacts",
  }: {
    page: number;
    limit: number;
    categoryId?: string;
    createdAtStart?: string;
    createdAtEnd?: string;
    endpoint?: string;
  }) {
    const queryParam = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (categoryId) queryParam.append("categoryId", categoryId);
    if (createdAtStart) queryParam.append("createdAtStart", createdAtStart);
    if (createdAtEnd) queryParam.append("createdAtEnd", createdAtEnd);

    const { data } = await axios.get<ContactResponse<Contact[]>>(
      `${endpoint}?${queryParam.toString()}`
    );
    return data;
  }
}

export { ContactServices };
