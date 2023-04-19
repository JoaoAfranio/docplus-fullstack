import api from "./api";

async function getGraphicPatientData() {
  const response = await api.apiBff.get("/home/patients");
  return response.data;
}

async function getPatients() {
  const response = await api.apiBase.get("/patients");
  return response.data;
}

async function upsertPatient(patient) {
  const response = await api.apiBase.post("/patients/", patient);
  return response.data;
}

async function getPatientGenders() {
  const response = await api.apiBase.get("/patients/gender");
  return response.data;
}

const patientApi = {
  getGraphicPatientData,
  getPatients,
  upsertPatient,
  getPatientGenders,
};

export default patientApi;
