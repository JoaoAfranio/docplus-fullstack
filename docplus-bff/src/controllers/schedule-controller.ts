import { getSchedule } from "@/services/schedule-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function findSchedule(req: Request, res: Response) {
  const authHeader = req.header("Authorization");
  try {
    const schedule = await getSchedule(authHeader);

    return res.status(httpStatus.OK).send(schedule);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
