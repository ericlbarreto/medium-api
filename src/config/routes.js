import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { specs, swaggerUi } from "../../swagger";
import { UserRoutes } from "../routes";

export default class Routes {
	constructor() {
		this.routes = new Router();

		this.UserRoutes = new UserRoutes();
	}

	setup() {
		this.routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

		this.routes.use("/users", this.UserRoutes.setup());
		return this.routes;
	}
}
