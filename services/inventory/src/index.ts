import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import morgan from "morgan";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;

app.use(morgan("tiny"));

app.get("/check-products-health", async (_req: Request, res: Response) => {
	try {
		const response = await axios.get("http://products-services:5001/health");
		res.status(200).json({
			message:
				"Inventory service is healthy and products service health status is: ",
			productsServiceHealth: response.data,
		});
	} catch (error) {
		console.error("Error fetching products service health:", error);
		res.status(500).json({
			message: "Failed to reach products service",
		});
	}
});

app.get("", (_req, res) => {
	res.status(404).json({
		message: "Route not found! please check docs",
	});
});

app.get("/health", (_req, res) => {
	res.status(200).json({
		message: "My health is ok.",
	});
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
