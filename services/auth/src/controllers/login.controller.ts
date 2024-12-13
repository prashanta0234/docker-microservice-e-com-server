import { TryCatch } from "@/middlewares/try-catch";
import LoginService from "@/services/login.service";
import { SendSuccessResponse } from "@/utils/responseHelper";

const LoginController = TryCatch(async (req, res) => {
	const result = await LoginService(req.body);

	SendSuccessResponse(res, {
		message: "Your login successfully!",
		status: 200,
		data: result,
	});
});

export default LoginController;
