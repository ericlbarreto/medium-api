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

	async read(id) {
		try {
			const post = await Post.findByPk(id);

			if (!post) {
				throw new Error("Post not found");
			}

			return post;
		} catch (error) {
			throw error;
		}
	}

    async readAll() {
		try {
			const posts = await Post.findAll({
				include: [
					{
						model: PostLike,
						as: 'post-likes',  // Certifique-se de que este alias corresponde ao alias definido na associação
					},
				],
			});

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
