import BaseController from "./base";
import { PostLikeService } from "../services";

export default class PostLikeController extends BaseController {
	constructor() {
		super();

		this.PostLikeService = new PostLikeService();

		this.bindActions(["like", "dislike"]);
	}

	async like(req, res) {
		const postId = req.params.id;
		const userId = req.auth.id;
		try {
			await this.PostLikeService.like(userId, postId);
			this.successHandler(true, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async dislike(req, res) {
        const postId = req.params.id;
		const userId = req.auth.id;
		try {
			await this.PostLikeService.dislike(userId, postId);
			this.successHandler(true, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
