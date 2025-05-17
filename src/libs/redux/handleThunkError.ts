import axios from "axios";

import type { ErrorResponse } from "@/data/models/erros";

const handleThunkError = (error: unknown): ErrorResponse =>
  axios.isAxiosError(error)
    ? {
        error: true,
        message:
          error.response?.data?.message ||
          error.message ||
          "Unknown request error.",
      }
    : {
        error: true,
        message:
          error instanceof Error ? error.message : "An unknown error occurred.",
      };

export { handleThunkError };
