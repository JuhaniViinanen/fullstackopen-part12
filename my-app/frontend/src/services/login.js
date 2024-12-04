import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const baseURL = "/api/login";

const login = async (credentials) => {
  const res = await axios.post(baseURL, credentials);
  return res.data;
};

export default { login };
