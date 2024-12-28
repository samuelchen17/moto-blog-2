import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

const _get = <T>(url: string, config = {}) => {
  return apiClient.get<T>(url, config);
};

const _delete = (url: string, config = {}) => {
  return apiClient.delete(url, config);
};

const _put = (url: string, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

const _post = (url: string, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

const _patch = (url: string, data = {}, config = {}) => {
  return apiClient.patch(url, data, config);
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios Error:",
        error.response?.data?.message || error.message
      );
    } else {
      console.error("Unexpected Error:", error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

export { _get, _delete, _put, _post, _patch };
