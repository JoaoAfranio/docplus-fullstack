import api from "./api";

async function getSchedule() {
  const response = await api.apiBff.get("/schedule");
  return response.data;
}

const scheduleApi = {
  getSchedule,
};

export default scheduleApi;
