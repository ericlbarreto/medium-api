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
				userId: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: "users",
						key: "id",
					},
				},
				postId: {
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
				tableName: "post-likes",
				createdAt: "createdAt",
				updatedAt: "updatedAt",
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Post, { foreignKey: "postId", as: 'post' });
		this.belongsTo(models.User, { foreignKey: "userId", as: 'user' });
	}
}
