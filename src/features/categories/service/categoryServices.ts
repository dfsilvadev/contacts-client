import type { CategoriesResponse, Category } from "@/data/models/category";
import type { ErrorResponse } from "@/data/models/erros";
import { axios } from "@/libs/axios/axiosInstance";

const list = async () => {
  try {
    const { data } = await axios.get<
      CategoriesResponse<Category[]> | ErrorResponse
    >("/categories");

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
  }
};

const categoryService = {
  list,
};

export default categoryService;
