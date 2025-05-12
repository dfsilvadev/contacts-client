import { axios } from "@/libs/axios/axiosInstance";

import type { ContactResponse } from "@/data/models/contact";
import type { ErrorResponse } from "@/data/models/erros";

const list = async (page = 1, limit = 10) => {
  try {
    const { data } = await axios.get<ContactResponse | ErrorResponse>(
      `?page=${page}&limit=${limit}`
    );

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
  }
};

const contactService = {
  list,
};

export default contactService;
