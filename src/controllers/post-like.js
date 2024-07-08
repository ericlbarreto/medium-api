import BaseController from "./base";
import { PostLikeService } from "../services";

export default class PostLikeController extends BaseController {
    constructor() {
        super();

        this.PostLikeService = new PostLikeService();

        this.bindActions([
            "like",
            "dislike",
        ]);
    }

    async like(req, res) {
        const { postId } = req.body;
        const { userId } = req.auth.id;
        try {
            const post = await this.PostLikeService.create(req.body);
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async dislike(req, res) {
        try {
            const post = await this.PostLikeService.read(req.params.id);
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

}