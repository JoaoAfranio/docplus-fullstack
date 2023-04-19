import genderRepository from "@/repositories/gender-repository";
import patientRepository from "@/repositories/patient-repository";
import { Prisma } from "@prisma/client";

export async function getAllPatients() {
  const patients = await patientRepository.findAll();

  return patients;
}

export async function createOrUpdatePatient(newPatient: Prisma.PatientUncheckedCreateInput) {
  const patient = await patientRepository.upsert(newPatient);
  return patient;
}

export async function deletePatient(id: number) {
  const deletedPatient = await patientRepository.deletePatient(id);
  return deletedPatient;
}

export async function getGenders() {
  const genders = await genderRepository.findAll();
  return genders;
}

const patientService = {
  getAllPatients,
  createOrUpdatePatient,
  deletePatient,
  getGenders,
};

export default patientService;
