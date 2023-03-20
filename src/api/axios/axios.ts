import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Notify, showNotify } from "vant";
import router from "../../router/index";
import { useUserStore } from "../../store/useUserStore";
import { pinia } from "../../store";

const userStore = useUserStore(pinia);

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * @Request
 */
service.interceptors.request.use(
  //Success request
  (config) => {
    config.headers = {
      Authorization: `Bearer ${userStore.user.token}`,
      // "Accept-Language": "en",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * @Response
 */
service.interceptors.response.use(
  //Success response
  (res) => {
    if (res.data.err_code === 888) {
      showNotify("You already borrow this book!");
      return Promise.reject(res.data);
    }
    if (res.data.err_code != 0) {
      showNotify(res.data.err_msg);
      return Promise.reject(res.data);
    }
    // showNotify(res.data.err_msg);
    return res.data;
  },
  //Fail response
  (error) => {
    // Can handle error response with 'error.response.status'
    return Promise.reject(error);
  }
);

export default service;
