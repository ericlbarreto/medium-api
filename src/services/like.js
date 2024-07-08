import { Like, Post } from "../models";

export default class LikeService {
	async like(userId, postId) {
		const transaction = await Post.sequelize.transaction();
		try {
			const post = await Post.findOne({
				where: {
					id: postId,
				},
				transaction,
			});

			if (!post) {
				throw new Error("Post not found");
			}

			const liked = await Like.findOne({
				where: {
					postId: postId,
					userId: userId,
				},
				transaction,
			});

			if (liked) {
				throw new Error("Post already liked by this user");
			}

			await Like.create(
				{
					postId: postId,
					userId: userId,
				},
				{ transaction }
			);

			await Post.increment("likes_count", {
				where: {
					id: postId,
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

	async dislike(userId, postId) {
		const transaction = await Post.sequelize.transaction();
		try {
			const post = await Post.findOne({
				where: {
					id: postId,
				},
				transaction,
			});

			if (!post) {
				throw new Error("Post not found");
			}

			const hasLike = await PostLike.findOne({
				where: {
					postId: postId,
					userId: userId,
				},
				transaction,
			});

			if (!hasLike) {
				throw new Error("Post not liked by this user");
			}

			await PostLike.destroy({
				where: {
					postId: postId,
					userId: userId,
				},
				transaction,
			});

			await Post.decrement("total_likes", {
				where: {
					id: postId,
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
