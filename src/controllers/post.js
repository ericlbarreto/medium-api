import BaseController from "./base";
import { PostService } from "../services";

export default class PostController extends BaseController {
	constructor() {
		super();

		this.PostService = new PostService();

		this.bindActions(["create", "read", "readAll", "update", "delete"]);
	}

	async create(req, res) {
		const user_id = req.auth.id;
		try {
			const post = await this.PostService.create(req.body, user_id);
			this.successHandler(post, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async read(req, res) {
		const user_id = req.auth.id;
		const post_id = req.params.id;
		try {
			const post = await this.PostService.read(user_id, post_id);
			this.successHandler(post, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async readAll(req, res) {
		const user_id = req.auth.id;
		const page = req.query.page || 1;
		try {
			const posts = await this.PostService.readAll(user_id, { page });
			this.successHandler(posts, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		const user_id = req.auth.id;
		try {
			const post = await this.PostService.update(
				req.body,
				req.params.id,
				user_id
			);
			this.successHandler(post, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async delete(req, res) {
		const user_id = req.auth.id;
		try {
			const post = await this.PostService.delete(req.params.id, user_id);
			this.successHandler(post, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
