import { z } from "zod";

const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type LoginDataType = z.infer<typeof LoginSchema>;
export default LoginSchema;
