// https://artik-backend.vercel.app/
import axios from "axios";

// const BASE_URL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:3000/api"
//     : "https://artik-backend.vercel.app/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //it means with every single request we will send token in our headers
});
