import axios from "axios";
import config from "../config";

const API = axios.create({
  baseURL: `${config.apiURL}/api/v1/`,
  headers: {
    "Content-type": "application/json",
  },
});

export default API;
