import axios from "axios";

const getKeycloakToken = async () => {
	if (!process.env.KEYCLOAK_CLIENT_ID || !process.env.KEYCLOAK_CLIENT_SECRET) {
		throw new Error("Keycloak client ID or secret is not configured.");
	}

	try {
		const response = await axios.post(
			`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
			new URLSearchParams({
				grant_type: "client_credentials",
				client_id: process.env.KEYCLOAK_CLIENT_ID,
				client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
			}),
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
		);

		return response.data.access_token;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get Keycloak token");
	}
};

export default getKeycloakToken;
