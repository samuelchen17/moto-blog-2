import { openLogin } from "@/redux/features/modal/authModalSlice";
import { signOutSuccess } from "@/redux/features/user/userSlice";
import { store } from "@/redux/store";
import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

const _get = <T>(url: string, config = {}) => {
  return apiClient.get<T>(url, config);
};

const _delete = <T>(url: string, config = {}) => {
  return apiClient.delete<T>(url, config);
};

const _put = <T>(url: string, data = {}, config = {}) => {
  return apiClient.put<T>(url, data, config);
};

const _post = <T>(url: string, data = {}, config = {}) => {
  return apiClient.post<T>(url, data, config);
};

const _patch = <T>(url: string, data = {}, config = {}) => {
  return apiClient.patch<T>(url, data, config);
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios Error:",
        error.response?.data?.message || error.message
      );

      // If the error is a 401 sign user out
      if (error.response?.status === 401) {
        try {
          await _post("/user");
          store.dispatch(signOutSuccess());
          store.dispatch(openLogin());

          toast.info("please sign in");
        } catch (err) {
          console.error("Error logging out user:", err);
        }
      }

      // for the catch block to display the error message sent from backend
      throw new Error(error.response?.data?.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

export { _get, _delete, _put, _post, _patch };
