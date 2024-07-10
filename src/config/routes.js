import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { specs, swaggerUi } from "../../swagger";
import { UserRoutes, AuthRoutes, PostRoutes } from "../routes";

export default class Routes {
	constructor() {
		this.routes = new Router();

		this.UserRoutes = new UserRoutes();
		this.AuthRoutes = new AuthRoutes();
		this.PostRoutes = new PostRoutes();
	}

	setup() {
		this.routes.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

		this.routes.use("/login", this.AuthRoutes.setup());
		this.routes.use("/users", this.UserRoutes.setup());

		this.routes.use(
			"/posts",
			AuthMiddleware.isAuthorized,
			this.PostRoutes.setup()
		);

		return this.routes;
	}
}
