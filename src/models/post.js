import BaseModel from "./base";

export default class Post extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.UUID,
					primaryKey: true,
					defaultValue: DataTypes.UUIDV4,
				},
				title: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				content: {
					type: DataTypes.TEXT,
					allowNull: false,
				},
				likes_count: {
					type: DataTypes.INTEGER,
					allowNull: false,
					defaultValue: 0,
				},
				userId: {
					type: DataTypes.UUID,
					allowNull: false,
					references: {
						model: 'Users',
						key: 'id'
					}
				},
			},
			{
				timestamps: true,
				sequelize: sequelize,
				modelName: "post",
				tableName: "Posts",
				createdAt: "createdAt",
				updatedAt: "updatedAt",
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'userId' });
		this.hasMany(models.Like, { foreignKey: 'postId' })
	}
}
