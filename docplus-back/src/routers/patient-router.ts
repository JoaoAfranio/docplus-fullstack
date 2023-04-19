import { getAllPatients, createOrUpdatePatient, deletePatient, getAllGenders } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createPatientSchema } from "@/schemas/patient-schemas";
import { Router } from "express";

const patientRouter = Router();

patientRouter
  .all("/*", authenticateToken)
  .get("", getAllPatients)
  .get("/gender", getAllGenders)
  .post("", validateBody(createPatientSchema), createOrUpdatePatient)
  .delete("/:id", deletePatient);

export { patientRouter };
