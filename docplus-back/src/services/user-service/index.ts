import userRepository from "@/repositories/user-repository";
import { Prisma } from "@prisma/client";
import { duplicatedEmailError } from "./errors";
import bcrypt from "bcrypt";

export async function createOrUpdateUser(newUser: Prisma.UserUncheckedCreateInput & Prisma.MedicUncheckedCreateInput) {
  if (!newUser.id) {
    await validateUniqueEmail(newUser.email);
  }

  newUser.password = await bcrypt.hash(newUser.password, 12);

  return await userRepository.upsert(newUser);
}

async function validateUniqueEmail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export async function getUserById(userId: number) {
  return await userRepository.findUserById(userId);
}

const userService = {
  createOrUpdateUser,
  getUserById,
};

export * from "./errors";
export default userService;
