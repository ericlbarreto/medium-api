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

	async read(userId, postId) {
		try {
			let post;
			if (userId) {
				post = await Post.scope([
					{ name: "withAuthenticatedUser", options: userId },
				]).findByPk(postId, {
					attributes: [
						"id",
						"userId",
						"title",
						"content",
						"total_likes",
						"createdAt",
					],
				});
			} else {
				post = await Post.findByPk(postId);
			}

			if (!post) {
				throw new Error("Post not found");
			}

			return post;
		} catch (error) {
			throw error;
		}
	}

	async readAll(userId, meta) {
		try {
			const scopes = [];
			const Pagination = PaginationUtils.config({
				page: meta.page,
			});
			if (userId) {
				scopes.push({
					name: "withAuthenticatedUser",
					options: userId,
				});
			}

			const postsPromise = Post.scope(scopes).findAll({
				...Pagination.getQueryParams(),
				raw: false,
				attributes: [
					"id",
					"userId",
					"title",
					"content",
					"total_likes",
					"createdAt",
				],
				order: [["createdAt", "DESC"]],
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

	async update(body, id) {
		const transaction = await Post.sequelize.transaction();

		try {
			const [_, [updatedPost]] = await Post.update(body, {
				where: { id },
				returning: true,
				transaction,
			});

			await transaction.commit();
			return updatedPost;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	async delete(id) {
		try {
			const post = await Post.findByPk(id);

			if (!post) {
				throw new Error("Post not found");
			}

			await Post.destroy({ where: { id } });

			return { message: "Post deleted successfully" };
		} catch (error) {
			throw error;
		}
	}
}
