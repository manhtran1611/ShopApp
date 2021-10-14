import axios from "axios";
import config from "../config";

const API = axios.create({
  baseURL: `${config.baseURL}/api/v1/`,
  headers: {
    "Content-type": "application/json",
  },
});

export default API;
