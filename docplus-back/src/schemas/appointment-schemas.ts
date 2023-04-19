import { Prisma } from "@prisma/client";
import Joi from "joi";

export const createAppointmentSchema = Joi.object<Prisma.AppointmentUncheckedCreateInput>({
  id: Joi.number(),
  date: Joi.string().isoDate().required(),
  duration: Joi.string().required(),
  medicId: Joi.number().required(),
  patientId: Joi.number().required(),
  typeId: Joi.number().required(),
  methodId: Joi.number().required(),
  reasonId: Joi.number().required(),
  statusId: Joi.number().required(),
});
