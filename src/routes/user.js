import { UserSchema } from "../schemas";
import { UserController } from "../controllers";
import BaseRoutes from "./base";
import { AuthMiddleware } from "../middlewares";

export default class UserRoutes extends BaseRoutes {
	constructor() {
		super();

		this.UserController = new UserController();
	}

	setup() {
		this.router.post(
			"/",
			this.SchemaValidator.validate(UserSchema.create),
			this.UserController.create.bind(this.UserController)
		);

        this.router.get(
            "/",
            AuthMiddleware.isAuthorized,
            this.UserController.read.bind(this.UserController)
        )

        this.router.put(
            "/",
            AuthMiddleware.isAuthorized,
            this.UserController.update.bind(this.UserController)
        )
        
        this.router.delete(
            "/",
            AuthMiddleware.isAuthorized,
            this.UserController.delete.bind(this.UserController)
        )
    
        return this.router;
	}
}
