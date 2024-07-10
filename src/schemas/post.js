import * as yup from "yup";

const findById = {
	params: yup
		.object()
		.shape({
			id: yup.number().required(),
		})
		.noUnknown(),
};

const paginationSchema = yup.object().shape({
	page: yup.number().integer().min(1).default(1),
});

const postSchema = {
	create: {
		body: yup
			.object()
			.shape({
				title: yup.string().required(),
				content: yup.string().required(),
				user_id: yup.number().required(),
			})
			.noUnknown(),
	},
	read: findById,
	readAll: {
		query: paginationSchema,
	},
	update: {
		params: findById.params,
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
	readAll: postSchema.readAll,
	update: {
		params: postSchema.update.params,
		body: postSchema.update.body,
	},
	delete: postSchema.delete,
	like: postSchema.like,
	dislike: postSchema.dislike,
};
