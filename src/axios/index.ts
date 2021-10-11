import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1611/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
});

export default API;
