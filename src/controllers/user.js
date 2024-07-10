import BaseController from "./base";
import { UserService } from "../services";

export default class UserController extends BaseController {
    constructor() {
        super();

        this.UserService = new UserService();

        this.bindActions([
            "create",
            "read",
            "update",
            "delete",
        ]);
    }

    async create(req, res) {
        try {
            const user = await this.UserService.create(req.body);
            this.successHandler(user, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async read(req, res) {
        try {
            const user = await this.UserService.read(req.params.id);
            this.successHandler(user, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async update(req, res) {
        const authenticatedUser = req.auth.id;

        try {
            const user = await this.UserService.update(req.body, req.params.id, authenticatedUser);
            this.successHandler(user, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async delete(req, res) {
        const authenticatedUser = req.auth.id;

        try {
            const user = await this.UserService.delete(req.params.id, authenticatedUser);
            this.successHandler(user, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }
}