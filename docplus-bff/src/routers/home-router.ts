import { findAppointmentsStatistics, findNextAppointments, findPatientsStatistics } from "@/controllers/home-controller";
import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/patients", findPatientsStatistics).get("/nextAppointments", findNextAppointments).get("/appointments", findAppointmentsStatistics);

export { homeRouter };
