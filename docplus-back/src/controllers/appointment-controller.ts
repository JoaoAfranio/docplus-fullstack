import { AuthenticatedRequest } from "@/middlewares";
import appointmentService from "@/services/appointment-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllApointments(req: AuthenticatedRequest, res: Response) {
  const medicId = req.medicId;
  try {
    const appointments = await appointmentService.getAllApointments(medicId);

    return res.status(httpStatus.OK).send(appointments);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createOrUpdateAppointment(req: AuthenticatedRequest, res: Response) {
  const appointment = req.body;

  try {
    await appointmentService.createOrUpdateAppointment(appointment);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteAppointment(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    await appointmentService.deleteAppointment(Number(id));
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getAppointmentTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await appointmentService.getAllTypes();

    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
