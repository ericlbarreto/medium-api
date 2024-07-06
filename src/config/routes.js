import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { specs, swaggerUi } from "../../swagger";

export default class Routes {
	constructor() {
		this.routes = new Router();
	}

	setup() {
		this.routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
		return this.routes;
	}
}
