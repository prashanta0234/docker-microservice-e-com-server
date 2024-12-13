import { LoginDataType } from "@/validation/login.schema";
import axios from "axios";

const LoginService = async (data: LoginDataType) => {
	const { email, password } = data;

	if (!process.env.KEYCLOAK_CLIENT_ID || !process.env.KEYCLOAK_CLIENT_SECRET) {
		throw new Error("Keycloak client ID or secret is not configured.");
	}
	const response = await axios.post(
		`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
		new URLSearchParams({
			grant_type: "password",
			client_id: process.env.KEYCLOAK_CLIENT_ID,
			client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
			username: email,
			password,
		}),
		{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
	);

	return response.data;
};

export default LoginService;
