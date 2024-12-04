import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const baseURL = "/api/users";

const getAll = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

export default { getAll };
