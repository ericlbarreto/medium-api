import { UserSchema } from "../schemas";
import { UserController } from "../controllers";
import BaseRoutes from "./base";

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
            this.UserController.update.bind(this.UserController)
        )
        
        this.router.delete(
            "/:id",
            this.SchemaValidator.validate(UserSchema.delete),
            this.UserController.delete.bind(this.UserController)
        )
    
        return this.router;
	}
}
