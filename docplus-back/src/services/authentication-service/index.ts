import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { Medic, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "./errors";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await findUserByEmail(email);

  await validatePassword(password, user.password);

  const token = await createSession(user.id, user.Medic);

  delete user.password;

  return {
    user,
    token,
  };
}

async function findUserByEmail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number, medic: MedicType) {
  const token = jwt.sign({ userId, medic }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePassword(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = {
  id: number;
  email: string;
  password: string;
  Medic: MedicType;
};

type MedicType = {
  id: number;
  startHour: string;
  endHour: string;
};

const authenticationService = {
  signIn,
};

export default authenticationService;
export * from "./errors";
