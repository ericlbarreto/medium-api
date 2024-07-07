import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { specs, swaggerUi } from "../../swagger";
import { UserRoutes, AuthRoutes } from "../routes";

export default class Routes {
	constructor() {
		this.routes = new Router();

		this.UserRoutes = new UserRoutes();
		this.AuthRoutes = new AuthRoutes();
	}

	setup() {
		this.routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

		this.routes.use("/login", this.AuthRoutes.setup());
		this.routes.use("/users", this.UserRoutes.setup());
		return this.routes;
	}
}
