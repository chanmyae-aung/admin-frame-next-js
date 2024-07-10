import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { getToken } from "./getToken";

const appAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

appAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      //TODO: add headers
      const token = await getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (!response.data) {
      return Promise.reject(response);
    }
    return response;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default appAxios;
