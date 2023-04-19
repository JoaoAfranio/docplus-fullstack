import { Prisma } from "@prisma/client";
import Joi from "joi";

export const createUserSchema = Joi.object<Prisma.UserUncheckedCreateInput & Prisma.MedicUncheckedCreateInput>({
  id: Joi.number(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  startHour: Joi.string().required(),
  endHour: Joi.string().required(),
});
