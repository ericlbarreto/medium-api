import { PostLike, Post } from "../models";

export default class PostLikeService {
	async like(user_id, post_id) {
		const transaction = await Post.sequelize.transaction();
		try {
			const post = await Post.findOne({
				where: {
					id: post_id,
				},
				transaction,
			});

			if (!post) {
				throw new Error("Post not found");
			}

			const liked = await PostLike.findOne({
				where: {
					post_id: post_id,
					user_id: user_id,
				},
				transaction,
			});

			if (liked) {
				throw new Error("Post already liked by this user");
			}

			await PostLike.create(
				{
					post_id: post_id,
					user_id: user_id,
				},
				{ transaction }
			);

			await Post.increment("total_likes", {
				where: {
					id: post_id,
				},
				by: 1,
				transaction,
			});

			await transaction.commit();
			return post;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	async dislike(user_id, post_id) {
		const transaction = await Post.sequelize.transaction();
		try {
			const post = await Post.findOne({
				where: {
					id: post_id,
				},
				transaction,
			});

			if (!post) {
				throw new Error("Post not found");
			}

			const hasLike = await PostLike.findOne({
				where: {
					post_id: post_id,
					user_id: user_id,
				},
				transaction,
			});

			if (!hasLike) {
				throw new Error("Post not liked by this user");
			}

			await PostLike.destroy({
				where: {
					post_id: post_id,
					user_id: user_id,
				},
				transaction,
			});

			await Post.decrement("total_likes", {
				where: {
					id: post_id,
				},
				by: 1,
				transaction,
			});

			await transaction.commit();
			return post;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
}
