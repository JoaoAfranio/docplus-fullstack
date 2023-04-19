import api from "./api";

async function getUser() {
  const response = await api.apiBase.get("/users");
  return response.data;
}

async function updateUser(user) {
  const response = await api.apiBase.post("/users", user);
  return response.data;
}

const userApi = {
  getUser,
  updateUser,
};

export default userApi;
