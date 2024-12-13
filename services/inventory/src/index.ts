import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import morgan from "morgan";
import axios from "axios";
import { GlobalErrorHandler } from "./middlewares/global-error-validation";
import bodyParser from "body-parser";
import path from "path";

dotenv.config({ path: "../.env" });

const app: Express = express();
const port = process.env.PORT || 5001;

app.use(bodyParser());

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

// start key clock

const KEYCLOAK_BASE_URL = "http://localhost:8080";
const KEYCLOAK_REALM = "ecommicro";
const KEYCLOAK_CLIENT_ID = "testapp";
const KEYCLOAK_CLIENT_SECRET = "dMb0wTaXcAw0bXQlOK9cMotBavjr0tPx";

// Helper to get Keycloak token

const getKeycloakToken = async () => {
	console.log("I'm triggered");

	if (!KEYCLOAK_CLIENT_ID || !KEYCLOAK_CLIENT_SECRET) {
		throw new Error("Keycloak client ID or secret is not configured.");
	}

	try {
		const response = await axios.post(
			`http://localhost:8080/realms/e-com-micro/protocol/openid-connect/token`,
			new URLSearchParams({
				grant_type: "client_credentials",
				client_id: KEYCLOAK_CLIENT_ID,
				client_secret: KEYCLOAK_CLIENT_SECRET,
			}),
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
		);

		return response.data.access_token;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get Keycloak token");
	}
};

app.post("/register", async (req, res) => {
	const { username, email, password, role } = req.body;

	try {
		if (!KEYCLOAK_CLIENT_ID || !KEYCLOAK_CLIENT_SECRET) {
			throw new Error("Keycloak client ID or secret is not configured.");
		}

		const adminToken = await getKeycloakToken();
		// console.log(adminToken, "hello");

		await axios.post(
			`http://localhost:8080/realms/e-com-micro/clients-registrations/openid-connect`,
			{
				username,
				email,
				enabled: true,
				credentials: [
					{
						type: "password",
						value: password,
						temporary: false,
					},
				],
			},
			{
				headers: {},
			}
		);

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:");
		if (error instanceof Error) {
			res
				.status(500)
				.json({ message: "Registration failed", error: error.message });
		} else {
			res
				.status(500)
				.json({ message: "Registration failed", error: "Unknown error" });
		}
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		if (!KEYCLOAK_CLIENT_ID || !KEYCLOAK_CLIENT_SECRET) {
			throw new Error("Keycloak client ID or secret is not configured.");
		}
		const response = await axios.post(
			`http://localhost:8080/realms/ecommicro/protocol/openid-connect/token`,
			new URLSearchParams({
				grant_type: "password",
				client_id: KEYCLOAK_CLIENT_ID,
				client_secret: KEYCLOAK_CLIENT_SECRET,
				username,
				password,
			}),
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
		);
		console.log(response);

		res.status(200).json({ message: "Login successful", token: response.data });
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			if (error.name === "unauthorized") {
				res
					.status(401)
					.json({ message: "Invalid credentials", error: error.message });
			} else {
				res.status(500).json({ message: "Login failed", error: error.message });
			}
		}
	}
});

// end test keyclock

// add global error handler
app.use(GlobalErrorHandler);

app.get("/health", (_req, res) => {
	res.status(200).json({
		message: "My health is ok.",
	});
});

app.use((_req, res, _next) => {
	res.status(404).json({
		message: "Route not found! Please check the documentation.",
	});
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
