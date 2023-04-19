import { prisma } from "@/config";

async function findMethods() {
  return prisma.appointmentMethod.findMany({});
}

async function findReasons() {
  return prisma.appointmentReason.findMany({});
}

async function findStatus() {
  return prisma.appointmentStatus.findMany({});
}

async function findTypes() {
  return prisma.appointmentType.findMany({});
}

const appointmentTypesRepository = {
  findMethods,
  findReasons,
  findStatus,
  findTypes,
};

export default appointmentTypesRepository;
