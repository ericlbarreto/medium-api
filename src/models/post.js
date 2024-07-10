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
				user_id: {
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
				createdAt: "created_at",
				updatedAt: "updated_at",
				defaultScope: {
					attributes: {
						exclude: ["user_id"],
					},
				},
				scopes: {
					withAuthenticatedUser: (user_id) => ({
						attributes: [
							[
								sequelize.literal(`(
							SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END
							FROM "post_likes" AS pl
							WHERE
							  pl."post_id" = "post"."id" AND
							  pl."user_id" = :user_id
						  )`),
								"is_liked",
							],
							[
								sequelize.literal(
									`CASE WHEN "post"."user_id" = :user_id THEN TRUE ELSE FALSE END`
								),
								"is_owner",
							],
						],
						replacements: {
							user_id,
						},
					}),
				},
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
		this.hasMany(models.PostLike, {
			foreignKey: "post_id",
			as: "post_likes",
		});
	}
}
