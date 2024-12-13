import { Router } from "express";
import RegistrationSchema from "./validation/registration.schema";
import RegistrationController from "./controllers/registration.controller";
import { debug } from "./middlewares/debug-middleware";
import { ValidationHandler } from "./middlewares/validation.handler";

export const AppRouter = Router();

AppRouter.post(
	"/registration",
	ValidationHandler(RegistrationSchema),
	RegistrationController
);
