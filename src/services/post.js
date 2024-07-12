import { Post, PostLike } from "../models";
import { PaginationUtils } from "../utils";

export default class PostService {
	async create(post) {
		const transaction = await Post.sequelize.transaction();

		try {
			const newPost = await Post.create(post, { transaction });

			await transaction.commit();

			return newPost;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	async read(user_id, post_id) {
		try {
			let post;
			if (user_id) {
				post = await Post.scope([
					{ name: "withUserInteraction", options: user_id },
				]).findByPk(post_id, {
					attributes: [
						"id",
						"user_id",
						"title",
						"content",
						"total_likes",
						"created_at",
						"updated_at",

						
					],
				});
			} else {
				post = await Post.findByPk(post_id);
			}

			if (!post) {
				throw new Error("Post not found");
			}

			return post;
		} catch (error) {
			throw error;
		}
	}

	async readAll(user_id, meta) {
		try {
			const scopes = [];
			const Pagination = PaginationUtils.config({
				page: meta.page,
			});
			if (user_id) {
				scopes.push({
					name: "withUserInteraction",
					options: user_id,
				});
			}

			const postsPromise = Post.scope(scopes).findAll({
				...Pagination.getQueryParams(),
				raw: false,
				attributes: [
					"id",
					"user_id",
					"title",
					"content",
					"total_likes",
					"created_at",
					"updated_at",

				],
				order: [["created_at", "DESC"]],
			});

			let totalItemsPromise;
			if (Pagination.getPage() === 1) {
				totalItemsPromise = Post.count({});
			}

			const [posts, totalItems] = await Promise.all([
				postsPromise,
				totalItemsPromise,
			]);

			return {
				...Pagination.mount(totalItems),
				posts,
			};
		} catch (error) {
			throw error;
		}
	}

	async update(body, id, user_id) {
		const transaction = await Post.sequelize.transaction();
	
		try {
			const [affectedRows, [updatedPost]] = await Post.update(body, {
				where: { id, user_id },
				returning: true,
				transaction,
			});
	
			if (!updatedPost) {
				throw new Error("Post not found or user not authorized to update this post");
			}
	
			await transaction.commit();
			return updatedPost;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}	

	async delete(id, user_id) {
		try {
			const post = await Post.findByPk(id);

			if (!post) {
				throw new Error("Post not found");
			}

			const deletedPost = await Post.destroy({ where: { id, user_id } });

			if (!deletedPost) {
				throw new Error("User not authorized to delete this post");
			}

			return { message: "Post deleted successfully" };
		} catch (error) {
			throw error;
		}
	}
}
