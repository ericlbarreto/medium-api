import { PostSchema } from "../schemas";
import { PostController } from "../controllers";
import BaseRoutes from "./base";

export default class PostRoutes extends BaseRoutes {
	constructor() {
		super();

		this.PostController = new PostController();
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
        )

        this.router.get(
            "/",
            this.SchemaValidator.validate(PostSchema.read),
            this.PostController.readAll.bind(this.PostController)
        )

        this.router.patch(
            "/:id",
            this.SchemaValidator.validate(PostSchema.update),
            this.PostController.update.bind(this.PostController)
        )
        
        this.router.delete(
            "/:id",
            this.SchemaValidator.validate(PostSchema.delete),
            this.PostController.delete.bind(this.PostController)
        )
    
        return this.router;
	}
}
