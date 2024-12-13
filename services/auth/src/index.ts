import express, { Express } from "express";
import dotenv from "dotenv";

import morgan from "morgan";
import path from "path";
import { AppRouter } from "./appRouter.routes";
import { GlobalErrorHandler } from "./middlewares/global-error-validation";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app: Express = express();
const port = process.env.PORT || 5003;
app.use(express.json());
app.use(morgan("tiny"));

app.get("", (_req, res) => {
	res.status(404).json({
		message: "Route not found! please check docs",
	});
});

app.use("/api/v1/auth", AppRouter);

app.get("/health", (_req, res) => {
	res.status(200).json({
		message: "My health is ok. From Auth!",
	});
});

app.use(GlobalErrorHandler);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
