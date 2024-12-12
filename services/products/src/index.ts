import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import morgan from "morgan";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5002;

app.use(morgan("tiny"));

app.get("", (_req, res) => {
	res.status(404).json({
		message: "Route not found! please check docs",
	});
});

app.get("/health", (_req, res) => {
	res.status(200).json({
		message: "My health is ok. From products!",
	});
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
