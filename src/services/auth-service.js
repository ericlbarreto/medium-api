import { User } from "../models";
import { AuthUtils, ExceptionUtils } from "../utils";
import * as bcrypt from "bcrypt";

export default class AuthService {
	async login(body) {
		const { email, password } = body;
		const user = await User.findOne({ where: { email } });

		if (!user) {
			throw new ExceptionUtils("NOT_FOUND");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new ExceptionUtils("INVALID_PASSWORD");
		}

		const token = AuthUtils.generateToken({ id: user.id });

		return { user: pick(user, ["id", "email", "name"]), token };
	}
}
