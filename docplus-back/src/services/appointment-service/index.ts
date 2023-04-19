import appointmentRepository from "@/repositories/appointment-repository";
import appointmentTypesRepository from "@/repositories/appointment-types";
import { Prisma } from "@prisma/client";

export async function getAllApointments(medicId: number) {
  const appointments = await appointmentRepository.findAll(medicId);

  return appointments;
}

export async function createOrUpdateAppointment(newAppointment: Prisma.AppointmentUncheckedCreateInput) {
  const appointment = await appointmentRepository.upsert(newAppointment);
  return appointment;
}

export async function deleteAppointment(id: number) {
  const deletedAppointment = await appointmentRepository.deleteAppointment(id);
  return deletedAppointment;
}

export async function getAllTypes() {
  const methods = await appointmentTypesRepository.findMethods();
  const reasons = await appointmentTypesRepository.findReasons();
  const status = await appointmentTypesRepository.findStatus();
  const types = await appointmentTypesRepository.findTypes();

  return { methods, reasons, status, types };
}

const appointmentService = {
  getAllApointments,
  createOrUpdateAppointment,
  deleteAppointment,
  getAllTypes,
};

export default appointmentService;
