import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      Medic: {
        select: {
          id: true,
          startHour: true,
          endHour: true,
        },
      },
    },
  });
}

async function findUserById(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      Medic: {
        select: {
          id: true,
          name: true,
          startHour: true,
          endHour: true,
        },
      },
    },
  });
}

async function upsert(createUser: Prisma.UserUncheckedCreateInput & Prisma.MedicUncheckedCreateInput) {
  return prisma.user.upsert({
    where: {
      id: createUser.id || -1,
    },
    create: {
      email: createUser.email,
      password: createUser.password,
      Medic: {
        create: {
          name: createUser.name,
          startHour: createUser.startHour,
          endHour: createUser.endHour,
        },
      },
    },
    update: {
      password: createUser.password,
      Medic: {
        update: {
          name: createUser.name,
          startHour: createUser.startHour,
          endHour: createUser.endHour,
        },
      },
    },
  });
}

const userRepository = {
  findByEmail,
  upsert,
  findUserById,
};

export default userRepository;
