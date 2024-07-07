import BaseController from "./base";
import AuthService from "../services";

export default class AuthController extends BaseController {
    constructor() {
        super();

        this.AuthService = new AuthService();

        this.bindActions([
            "login",
        ]);
    }

    async login(req, res) {
        try {
            const userAuthenticated = await this.AuthService.login(req.body);
            this.successHandler(userAuthenticated, res)
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }
}