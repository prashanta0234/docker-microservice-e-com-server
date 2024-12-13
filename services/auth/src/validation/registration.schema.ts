import { z } from "zod";

const RegistrationSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string(),
	role: z.string(z.enum(["USER", "ADMIN"])).default("USER"),
});

export type RegistrationDataType = z.infer<typeof RegistrationSchema>;
export default RegistrationSchema;
