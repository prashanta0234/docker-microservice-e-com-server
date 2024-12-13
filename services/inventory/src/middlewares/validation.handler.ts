import { AnyZodObject } from "zod";
import { TryCatch } from "./try-catch";

export const ValidationHandler = (schema: AnyZodObject) => {
	return TryCatch(async (req, _, next) => {
		const payload = await schema.parseAsync(req.body);
		req.body = payload;
		next();
	});
};
