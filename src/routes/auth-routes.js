import { AuthSchema } from "../schemas";
import { AuthController } from "../controllers";
import BaseRoutes from "./base";

export default class AuthRoutes extends BaseRoutes {
	constructor() {
		super();

		this.AuthController = new AuthController();
	}

	setup() {
		this.router.post(
			"/",
			this.SchemaValidator.validate(AuthSchema.create),
			this.AuthController.create.bind(this.AuthController)
		);    
        return this.router;
	}
}
