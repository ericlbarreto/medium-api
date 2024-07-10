import BaseModel from "./base";

export default class PostLike extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				user_id: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: "users",
						key: "id",
					},
				},
				post_id: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: "posts",
						key: "id",
					},
				},
			},
			{
				timestamps: true,
				sequelize: sequelize,
				modelName: "like",
				tableName: "post_likes",
				createdAt: "created_at",
				updatedAt: "updated_at",
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Post, { foreignKey: "post_id", as: 'post' });
		this.belongsTo(models.User, { foreignKey: "user_id", as: 'user' });
	}
}
