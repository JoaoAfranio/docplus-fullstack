import { createUser, getUserById } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createUserSchema } from "@/schemas/user-schemas";
import { Router } from "express";

const userRouter = Router();

userRouter.post("", validateBody(createUserSchema), createUser).all("/*", authenticateToken).get("", getUserById);

export { userRouter };
