import { getAppointmentsStatistics, getNextAppointments, getPatientsStatistics } from "@/services/home-service/";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function findPatientsStatistics(req: Request, res: Response) {
  const authHeader = req.header("Authorization");
  try {
    const patientStatistics = await getPatientsStatistics(authHeader);

    return res.status(httpStatus.OK).send(patientStatistics);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function findNextAppointments(req: Request, res: Response) {
  const authHeader = req.header("Authorization");
  try {
    const nextAppointments = await getNextAppointments(authHeader);

    return res.status(httpStatus.OK).send(nextAppointments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function findAppointmentsStatistics(req: Request, res: Response) {
  const authHeader = req.header("Authorization");
  try {
    const appointmentsStatistics = await getAppointmentsStatistics(authHeader);

    return res.status(httpStatus.OK).send(appointmentsStatistics);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
