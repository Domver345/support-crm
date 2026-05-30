import axios from "axios";

const API = axios.create({
  baseURL: "https://support-crm-pq99.onrender.com/api",
});

export default API;