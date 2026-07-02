// lib/api.js

import axios from "axios";

export default axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: "http://localhost:5000/api",
  withCredentials: true,
});