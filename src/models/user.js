import BaseModel from "./base";

export default class User extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.UUID,
					primaryKey: true,
					defaultValue: DataTypes.UUIDV4,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				email: {
					type: DataTypes.TEXT,
					allowNull: false,
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				paranoid: true,
				timestamps: true,
				sequelize: sequelize,
				modelName: "user",
				tableName: "users",
				createdAt: "created_at",
				updatedAt: "updated_at",
				deletedAt: "deleted_at",
			}
		);
	}

	static associate(models) {
		// relations
	}
}