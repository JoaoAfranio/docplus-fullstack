import { createOrUpdateAppointment, deleteAppointment, getAllApointments, getAppointmentTypes } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createAppointmentSchema } from "@/schemas/appointment-schemas";
import { Router } from "express";

const appointmentRouter = Router();

appointmentRouter
  .all("/*", authenticateToken)
  .get("", getAllApointments)
  .get("/types", getAppointmentTypes)
  .post("", validateBody(createAppointmentSchema), createOrUpdateAppointment)
  .delete("/:id", deleteAppointment);

export { appointmentRouter };
