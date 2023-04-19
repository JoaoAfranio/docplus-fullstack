import { signInUser } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas/authentication-schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("", validateBody(signInSchema), signInUser);

export { authenticationRouter };
