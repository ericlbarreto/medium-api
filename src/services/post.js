import { Post, PostLike } from "../models";

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
				post = await Post.scope([{name: "withAuthenticatedUser", options: userId}]).findByPk(postId ,{
					attributes: [
						"id",
						"userId",
						"title",
						"content",
						"total_likes",
						"createdAt"
					]
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

    async readAll(userId) {
		try {
		  let posts;
	
		  if (userId) {
			posts = await Post.scope([{name: "withAuthenticatedUser", options: userId}]).findAll({
				attributes: [
					"id",
					"userId",
					"title",
					"content",
					"total_likes",
					"createdAt"
				]
			});
		  } else {
			posts = await Post.findAll();
		  }
	
		  return posts;
		} catch (error) {
		  throw error;
		}
	  }

	async update(body, id) {
		const transaction = await Post.sequelize.transaction();

		try {
			const [_, [updatedPost]] = await Post.update(
				body,
				{
					where: { id },
					returning: true,
					transaction,
				}
			);

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
