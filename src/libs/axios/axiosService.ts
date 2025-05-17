import axios from "axios";

/**
 * This class provides a convenient way to create Axios instances with the same base URL and common headers.
 */
class AxiosService {
  private baseUrl: string;

  /**
   * Creates a new Axios instance with the specified base URL and common headers.
   * @param {string} baseUrl - The base URL for all requests.
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Creates a new Axios instance with the same base URL and common headers.
   * @returns {AxiosInstance} A new Axios instance with the specified base URL and common headers.
   */
  create() {
    return axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });
  }
}

export default AxiosService;
