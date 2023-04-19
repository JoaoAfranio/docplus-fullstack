import api from "./api";

async function getGraphicAppointmentData() {
  const response = await api.apiBff.get("/home/appointments");
  return response.data;
}

async function getNextAppointmentData() {
  const response = await api.apiBff.get("/home/nextAppointments");
  return response.data;
}

async function getAppointmentTypes() {
  const response = await api.apiBase.get("/appointments/types");
  return response.data;
}

async function upsertAppointment(appointment) {
  appointment.date = combineDateAndTime(appointment.date, appointment.hour);
  delete appointment.hour;

  const response = await api.apiBase.post("/appointments/", appointment);
  return response.data;
}

function combineDateAndTime(dateStr, timeStr) {
  const [year, month, day] = dateStr.split("-");
  const [hours, minutes] = timeStr.split(":");

  const date = new Date(year, month - 1, day, hours - 3, minutes);

  console.log(date);

  return date.toISOString();
}

const appointmentApi = {
  getGraphicAppointmentData,
  getNextAppointmentData,
  getAppointmentTypes,
  upsertAppointment,
};

export default appointmentApi;
