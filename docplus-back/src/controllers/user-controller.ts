import { Request, Response } from "express";
import userService from "@/services/user-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function createUser(req: Request, res: Response) {
  const user = req.body;
  try {
    const newUser = await userService.createOrUpdateUser(user);
    return res.status(httpStatus.CREATED).json({
      id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getUserById(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const user = await userService.getUserById(userId);
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.sendStatus(404);
  }
}
