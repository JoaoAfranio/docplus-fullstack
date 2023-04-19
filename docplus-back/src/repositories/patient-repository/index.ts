import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findAll() {
  return prisma.patient.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      Gender: true,
    },
  });
}

async function upsert(createPatient: Prisma.PatientUncheckedCreateInput) {
  return prisma.patient.upsert({
    where: {
      id: createPatient.id || -1,
    },
    create: createPatient,
    update: createPatient,
  });
}

async function deletePatient(patientId: number) {
  return prisma.patient.delete({
    where: {
      id: patientId,
    },
  });
}

const patientRepository = {
  findAll,
  upsert,
  deletePatient,
};

export default patientRepository;
