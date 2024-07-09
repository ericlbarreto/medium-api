import * as yup from "yup";

const findById = {
	params: yup
		.object()
		.shape({
			id: yup.number().required(),
		})
		.noUnknown(),
};

const postSchema = {
	create: {
		body: yup
			.object()
			.shape({
				title: yup.string().required(),
				content: yup.string().required(),
				userId: yup.number().required(),
			})
			.noUnknown(),
	},
	read: findById,
	update: {
		params: findById,
		body: yup
			.object()
			.shape({
				title: yup.string(),
				content: yup.string().email(),
			})
			.noUnknown(),
	},
	delete: findById,
	like: findById,
	dislike: findById,
};

export default {
	create: postSchema.create,
	read: postSchema.read,
	update: {
		params: postSchema.update.params,
		body: postSchema.update.body,
	},
	delete: postSchema.delete,
	like: postSchema.like,
	dislike: postSchema.dislike,
};
