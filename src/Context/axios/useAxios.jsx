import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://assignment-11-server-beige.vercel.app",
});
const useAxios = () => {
  const { user, logOut } = useContext(AuthContext);

  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  axiosInstance.interceptors.response.use((response) => {
    return response;
  }),
    (error) => {
      if (error.status === 401 || error.status === 403) {
        logOut()
          .then(() => {
            ("Logout successfull");
          })
          .catch((err) => err);
      }
      "Interceptors error", error;
      return Promise.reject(error);
    };
  return axiosInstance;
};

export default useAxios;
