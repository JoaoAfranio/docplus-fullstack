import { Prisma } from "@prisma/client";
import Joi from "joi";

export const createPatientSchema = Joi.object<Prisma.PatientUncheckedCreateInput>({
  id: Joi.number(),
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  phone: Joi.string().min(14).max(15).required(),
  birthday: Joi.string().isoDate().required(),
  genderId: Joi.number().required(),
});
