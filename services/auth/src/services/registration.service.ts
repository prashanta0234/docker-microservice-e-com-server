import getKeycloakToken from "@/utils/getKeyCloaktoken";
import { RegistrationDataType } from "@/validation/registration.schema";
import axios from "axios";

const RegistrationService = async (data: RegistrationDataType) => {
	const { email, password, firstName, lastName } = data;

	if (!process.env.KEYCLOAK_CLIENT_ID || !process.env.KEYCLOAK_CLIENT_SECRET) {
		throw new Error("Keycloak client ID or secret is not configured.");
	}

	const adminToken = await getKeycloakToken();

	// Create User
	const createUserResponse = await axios.post(
		`${process.env.KEYCLOAK_BASE_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
		{
			username: email,
			email,
			firstName,
			lastName,
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
			headers: {
				Authorization: `Bearer ${adminToken}`,
			},
		}
	);

	const userId = await axios.get(
		`${process.env.KEYCLOAK_BASE_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users?email=${email}`,
		{
			headers: {
				Authorization: `Bearer ${adminToken}`,
			},
		}
	);
	console.log(createUserResponse);

	if (data.role) {
		const rolesResponse = await axios.get(
			`${process.env.KEYCLOAK_BASE_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/roles`,
			{
				headers: {
					Authorization: `Bearer ${adminToken}`,
				},
			}
		);

		const role = rolesResponse.data.find((r: any) => r.name === data.role);
		if (!role) {
			throw new Error(`Role ${data.role} not found.`);
		}

		await axios.post(
			`${process.env.KEYCLOAK_BASE_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId.data[0].id}/role-mappings/realm`,
			[role],
			{
				headers: {
					Authorization: `Bearer ${adminToken}`,
				},
			}
		);
	}

	return { message: createUserResponse.data };
};

export default RegistrationService;
