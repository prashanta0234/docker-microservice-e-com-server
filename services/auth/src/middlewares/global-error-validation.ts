import { ErrorRequestHandler } from "express";

import { SendErrorResponse } from "../utils/responseHelper";

export const GlobalErrorHandler: ErrorRequestHandler = (err, _, res, __) => {
	let status: number = err.status || 500;
	let message: string = err.message || "Something went wrong";

	if (err.name === "ZodError") {
		status = 400;
		message = err.issues.reduce(
			(
				msg: string,
				issue: { message: string; path: any[]; received: string },
				index: number
			) => {
				msg +=
					issue.received === "undefined"
						? issue.message
						: `In ${issue.path[0]} ${issue.message}`;
				msg += index !== err.issues.length - 1 ? " || " : "";
				return msg;
			},
			""
		);
	}
	if (err.status === 409) {
		message = "You already have an account";
		err =
			"Your email already registered in our site. PLease use another email.";
	}

	if (err.name === "TokenExpiredError") {
		console.error(err);
		status = 401;
	}

	SendErrorResponse(res, { message, status, error: err });
};
