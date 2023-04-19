import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "@/config";
import { appointmentRouter, patientRouter, userRouter } from "@/routers";
import { authenticationRouter } from "./routers/authentication-router";

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => {
    res.send("OK!");
  })
  .use("/patients", patientRouter)
  .use("/users", userRouter)
  .use("/authentication", authenticationRouter)
  .use("/appointments", appointmentRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
