import BaseModel from "./base";

export default class Like extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.UUID,
					primaryKey: true,
					defaultValue: DataTypes.UUIDV4,
				},
				userId: {
					type: DataTypes.UUID,
					allowNull: false,
					references: {
						model: "Users",
						key: "id",
					},
				},
				postId: {
					type: DataTypes.UUID,
					allowNull: false,
					references: {
						model: "Posts",
						key: "id",
					},
				},
			},
			{
				timestamps: true,
				sequelize: sequelize,
				modelName: "like",
				tableName: "Likes",
				createdAt: "createdAt",
				updatedAt: "updatedAt",
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Post, { foreignKey: "postId" });
		this.belongsTo(models.User, { foreignKey: "userId" });
	}
}
