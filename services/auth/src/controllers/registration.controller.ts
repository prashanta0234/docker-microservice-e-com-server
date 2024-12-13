import { TryCatch } from "@/middlewares/try-catch";
import RegistrationService from "@/services/registration.service";
import { SendSuccessResponse } from "@/utils/responseHelper";

const RegistrationController = TryCatch(async (req, res) => {
	const result = await RegistrationService(req.body);

	SendSuccessResponse(res, {
		message: "Your registration successfully!",
		status: 201,
		data: result,
	});
});

export default RegistrationController;
