import { Response } from "express";

type SuccessResponseType = { data: any; message: string; status: number };
type ErrorResponseType = { error: any; message: string; status: number };

export function SendSuccessResponse(
	res: Response,
	{ status, data, message }: SuccessResponseType
) {
	return res
		.status(status)
		.json({ ok: true, message, statusCode: status, data });
}

export function SendErrorResponse(
	res: Response,
	{ status, message, error }: ErrorResponseType
) {
	return res.status(status).json({ ok: false, message, errorDetails: error });
}
