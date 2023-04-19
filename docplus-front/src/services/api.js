import axios from "axios";

const apiBase = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

const apiBff = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BFF_URL,
});

function setToken(request) {
  const userLocalStorage = localStorage.getItem("user");

  if (userLocalStorage) {
    const token = JSON.parse(userLocalStorage).token;
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}

apiBase.interceptors.request.use((request) => setToken(request));
apiBff.interceptors.request.use((request) => setToken(request));

const apiUrls = { apiBase, apiBff };

export default apiUrls;
