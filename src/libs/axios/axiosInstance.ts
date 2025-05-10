import AxiosService from "./axiosService";

const axiosService = new AxiosService(import.meta.env.VITE_API_BASE_URL);
const axios = axiosService.create();

export { axios };
