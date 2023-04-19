import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findAll() {
  return prisma.gender.findMany({});
}

const genderRepository = {
  findAll,
};

export default genderRepository;
