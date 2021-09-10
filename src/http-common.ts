import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:1611/api/v1/",
});
