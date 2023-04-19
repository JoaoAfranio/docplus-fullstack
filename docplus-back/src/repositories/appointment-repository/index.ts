import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findAll(medicId: number) {
  return prisma.appointment.findMany({
    include: { AppointmentMethod: true, AppointmentReason: true, AppointmentStatus: true, AppointmentType: true, Patient: true },
    where: {
      medicId,
    },
  });
}

async function upsert(createAppointment: Prisma.AppointmentUncheckedCreateInput) {
  return prisma.appointment.upsert({
    where: {
      id: createAppointment.id || -1,
    },
    create: createAppointment,
    update: createAppointment,
  });
}

async function deleteAppointment(appointmentId: number) {
  return prisma.appointment.delete({
    where: {
      id: appointmentId,
    },
  });
}

const appointmentRepository = {
  findAll,
  upsert,
  deleteAppointment,
};

export default appointmentRepository;
