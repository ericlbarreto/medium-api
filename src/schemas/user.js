import * as yup from "yup";

const findById = {
	params: yup
		.object()
		.shape({
			id: yup.number().required(),
		})
		.noUnknown(),
};

const userSchema = {
	create: {
		body: yup
			.object()
			.shape({
				name: yup.string().required(),
				email: yup.string().email().required(),
				password: yup.string().required(),
			})
			.noUnknown(),
	},
	read: findById,
	update: {
		params: findById.params,
		body: yup
			.object()
			.shape({
				name: yup.string().optional(),
				email: yup.string().email().optional(),
				password: yup.string().optional(),
			})
			.noUnknown(),
	},
	delete: findById,
};

export default {
	create: userSchema.create,
	read: userSchema.read,
	update: {
		params: userSchema.update.params,
		body: userSchema.update.body,
	},
	delete: userSchema.delete,
};
