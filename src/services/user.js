import bcrypt from "bcrypt";
import { User } from "../models";

export default class UserService {
	async create(user) {
		const transaction = await User.sequelize.transaction();

		try {
			user.password = await bcrypt.hash(user.password, 10);
			const newUser = await User.create(user, { transaction });

			await transaction.commit();

			return newUser;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	async read(authenticatedUser) {
		try {
			const user = await User.findByPk(authenticatedUser);

			if (!user) {
				throw new Error("User not found");
			}

			return user;
		} catch (error) {
			throw error;
		}
	}

	async update(body, authenticatedUser) {
		const transaction = await User.sequelize.transaction();

		try {
			if (Number(id) !== Number(authenticatedUser)) {
				throw new Error("Unauthorized user");
			}

			if (body.password) {
				body.password = await bcrypt.hash(body.password, 10);
			}

			const [_, [updatedUser]] = await User.update(
				body,
				{
					where: { id },
					returning: true,
					transaction,
				}
			);

			await transaction.commit();
			return updatedUser;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	async delete(authenticatedUser) {
		try {
			const user = await User.findByPk(authenticatedUser);

			if (!user) {
				throw new Error("User not found");
			}

			await User.destroy({ where: { authenticatedUser } });

			return { message: "User deleted successfully" };
		} catch (error) {
			throw error;
		}
	}
}
