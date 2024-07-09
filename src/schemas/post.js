import * as yup from 'yup';

const findById = {
    params: yup.object().shape({
        id: yup.string().required(),
    }).noUnknown(),
}

const postSchema = {
    create: {
        body: yup.object().shape({
            title: yup.string().required(),
            content: yup.string().required(),
            userId: yup.string().required(),
        }).noUnknown(),
    },
    read: findById.params,
    update: {
        params: findById.params,
        body: yup.object().shape({
            title: yup.string(),
            content: yup.string().email(),
        }).noUnknown(),
    },
    delete: findById.params,
    like: findById.params,
    dislike: findById.params,
}

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
}