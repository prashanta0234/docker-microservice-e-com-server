import { z } from "zod";

const CreateCategoriesSchema = z.object({
	c_name: z
		.string({ required_error: "Categories Name is required!" })
		.min(1)
		.max(250),
});

export type CreateCategoriesType = z.infer<typeof CreateCategoriesSchema>;

export default CreateCategoriesSchema;
