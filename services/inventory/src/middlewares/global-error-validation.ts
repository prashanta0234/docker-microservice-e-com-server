import { ErrorRequestHandler } from "express";

import { SendErrorResponse } from "../utils/responseHelper";
// import {
// 	PrismaClientKnownRequestError,
// 	PrismaClientRustPanicError,
// 	PrismaClientUnknownRequestError,
// } from "@prisma/client/runtime/library";

export const GlobalErrorHandler: ErrorRequestHandler = (err, _, res, __) => {
	let status: number = err.status || 500;
	let message: string = err.message || "Something went wrong";

	// if (err instanceof PrismaClientKnownRequestError) {
	// 	switch (err.code) {
	// 		case "P2002":
	// 			status = 400;
	// 			message = `Unique constraint violation on ${err.meta?.target}`;
	// 			break;
	// 		default:
	// 			status = 400;
	// 			message = "Prisma client error occurred.";
	// 			break;
	// 	}
	// } else if (err instanceof PrismaClientUnknownRequestError) {
	// 	status = 500;
	// 	message = "Unknown Prisma error occurred.";
	// } else if (err instanceof PrismaClientRustPanicError) {
	// 	status = 500;
	// 	message = "Prisma client experienced a rust panic.";
	// }

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

	if (err.name === "TokenExpiredError") {
		console.error(err);
		status = 401;
	}

	SendErrorResponse(res, { message, status, error: err });
};
