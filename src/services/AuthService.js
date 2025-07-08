// src/services/AuthService.js
import axios from "./axios"; // make sure you have an axios instance or import from "axios"

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post("/auth/login", { email, password }, { withCredentials: true });
    return response.data; // should contain { accessToken, user } from backend
  } catch (error) {
    throw error;
  }
};
