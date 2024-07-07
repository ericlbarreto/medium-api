import * as yup from 'yup';

const postSchema = {
    create: {
        body: yup.object().shape({
            title: yup.string().required(),
            content: yup.string().email().required(),
            userId: yup.string().required(),
        }).noUnknown(),
    },
    read: {
        params: yup.object().shape({
            id: yup.string().required(),
        }).noUnknown(),
    },
    update: {
        params: yup.object().shape({
            id: yup.string().required(),
        }).noUnknown(),
        body: yup.object().shape({
            title: yup.string(),
            content: yup.string().email(),
        }).noUnknown(),
    },
    delete: {
        params: yup.object().shape({
            id: yup.string().required(),
        }).noUnknown(),
    }
}

export default {
    create: postSchema.create,
    read: postSchema.read,
    update: {
        params: postSchema.update.params,
        body: postSchema.update.body,
    },
    delete: postSchema.delete,
}