import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

async function login(user) {
  const response = await api.post("/authentication/", user);

  return response.data;
}

async function register(user) {
  const response = await api.post("/users/", user);

  return response.data;
}

const authenticationApi = {
  register,
  login,
};

export default authenticationApi;
