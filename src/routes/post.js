import { PostSchema } from "../schemas";
import { PostController, PostLikeController } from "../controllers";
import BaseRoutes from "./base";

export default class PostRoutes extends BaseRoutes {
	constructor() {
		super();

		this.PostController = new PostController();
		this.PostLikeController = new PostLikeController();
	}

	setup() {
		this.router.post(
			"/",
			this.SchemaValidator.validate(PostSchema.create),
			this.PostController.create.bind(this.PostController)
		);

		this.router.get(
			"/:id",
			this.SchemaValidator.validate(PostSchema.read),
			this.PostController.read.bind(this.PostController)
		);

		this.router.get(
			"/",
			this.SchemaValidator.validate(PostSchema.readAll),
			this.PostController.readAll.bind(this.PostController)
		);

		this.router.put(
			"/:id",
			this.SchemaValidator.validate(PostSchema.update),
			this.PostController.update.bind(this.PostController)
		);

		this.router.delete(
			"/:id",
			this.SchemaValidator.validate(PostSchema.delete),
			this.PostController.delete.bind(this.PostController)
		);

		this.router.post(
			"/:id/like",
			this.SchemaValidator.validate(PostSchema.like),
			this.PostLikeController.like.bind(this.PostLikeController)
		);

		this.router.post(
			"/:id/dislike",
			this.SchemaValidator.validate(PostSchema.dislike),
			this.PostLikeController.dislike.bind(this.PostLikeController)
		);

		return this.router;
	}
}
