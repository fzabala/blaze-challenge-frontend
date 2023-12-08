import axios from "axios";
import { ErrorResponseType } from "../types";

export const normalizeAxiosError = (err: unknown): ErrorResponseType => {
  if (axios.isAxiosError(err)) {
    return err.response?.data || { message: err.message };
  }
  return err as ErrorResponseType;
};