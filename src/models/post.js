import BaseModel from "./base";

export default class Post extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				title: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				content: {
					type: DataTypes.TEXT,
					allowNull: false,
				},
				total_likes: {
					type: DataTypes.INTEGER,
					allowNull: false,
					defaultValue: 0,
				},
				userId: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: "users",
						key: "id",
					},
				},
			},
			{
				timestamps: true,
				sequelize: sequelize,
				modelName: "post",
				tableName: "posts",
				createdAt: "createdAt",
				updatedAt: "updatedAt",
				defaultScope: {
					attributes: {
						exclude: ["userId"], // Excluir userId por padrão
					},
				},
				scopes: {
					likedByUser: (userId) => ({
						attributes: [
							[
								sequelize.literal(`(
							SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END
							FROM "post-likes" AS pl
							WHERE
							  pl."postId" = "post"."id" AND
							  pl."userId" = :userId
						  )`),
								"isLiked",
							],
						],
						replacements: {
							userId,
						},
					}),
				},
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
		this.hasMany(models.PostLike, {
			foreignKey: "postId",
			as: "post-likes",
		});
	}
}
