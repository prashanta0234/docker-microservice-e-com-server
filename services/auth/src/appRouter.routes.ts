import { Router } from "express";
import RegistrationSchema from "./validation/registration.schema";
import RegistrationController from "./controllers/registration.controller";
import { debug } from "./middlewares/debug-middleware";
import { ValidationHandler } from "./middlewares/validation.handler";
import LoginSchema from "./validation/login.schema";
import LoginController from "./controllers/login.controller";

export const AppRouter = Router();

AppRouter.post(
	"/registration",
	ValidationHandler(RegistrationSchema),
	RegistrationController
);

AppRouter.post("/login", ValidationHandler(LoginSchema), LoginController);
