import { findSchedule } from "@/controllers/schedule-controller";
import { Router } from "express";

const scheduleRouter = Router();

scheduleRouter.get("/", findSchedule);

export { scheduleRouter };
