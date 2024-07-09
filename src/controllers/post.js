import BaseController from "./base";
import { PostService } from "../services";

export default class PostController extends BaseController {
    constructor() {
        super();

        this.PostService = new PostService();

        this.bindActions([
            "create",
            "read",
            "readAll",
            "update",
            "delete",
        ]);
    }

    async create(req, res) {
        try {
            const post = await this.PostService.create(req.body);
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async read(req, res) {
        const userId = req.auth.id;
        const postId = req.params.id
        try {
            const post = await this.PostService.read(userId, postId);
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async readAll(req, res) {
        const userId = req.auth.id;
        try {
            const posts = await this.PostService.readAll(userId);
            this.successHandler(posts, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async update(req, res) {
        try {
            const post = await this.PostService.update(req.body, req.params.id);
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async delete(req, res) {
        try {
            const post = await this.PostService.delete(req.params.id);
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }
}