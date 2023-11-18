"use server";

import { z } from "zod";
import axios from "axios";
import { store } from "./redux/store";

axios.defaults.baseURL = "https://indira-backend.vercel.app";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const login = async (formData: FormData) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const content = schema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  try {
    const { data } = await axios.post("/api/auth/login", content);
    setAuthHeader(data.accessToken);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await axios.get("/api/auth/logout");
    clearAuthHeader();
  } catch (error) {
    console.log(error);
  }
};

export const refreshUser = () => {
  try {
    const res = store.getState();
    console.log("STORE", res);
  } catch (error) {
    console.log(error);
  }
};
