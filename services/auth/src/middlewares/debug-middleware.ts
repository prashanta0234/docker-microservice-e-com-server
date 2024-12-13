export const debug = (req: { body: any }, res: any, next: () => void) => {
	console.log("Request body:", req.body); // Log the request body
	next(); // Properly call the `next()` middleware
};
