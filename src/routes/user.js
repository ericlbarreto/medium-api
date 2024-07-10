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
            "/:id",
            this.SchemaValidator.validate(UserSchema.read),
            this.UserController.read.bind(this.UserController)
        )

        this.router.put(
            "/:id",
            this.SchemaValidator.validate(UserSchema.update),
			AuthMiddleware.isAuthorized,
            this.UserController.update.bind(this.UserController)
        )
        
        this.router.delete(
            "/:id",
            this.SchemaValidator.validate(UserSchema.delete),
			AuthMiddleware.isAuthorized,
            this.UserController.delete.bind(this.UserController)
        )
    
        return this.router;
	}
}
