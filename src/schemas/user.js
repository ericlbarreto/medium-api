import * as yup from 'yup';

const userSchema = {
    create: {
        body: yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
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
            name: yup.string(),
            email: yup.string().email(),
            password: yup.string(),
        }).noUnknown(),
    },
    delete: {
        params: yup.object().shape({
            id: yup.string().required(),
        }).noUnknown(),
    }
}

export default {
    create: userSchema.create,
    read: userSchema.read,
    update: {
        params: userSchema.update.params,
        body: userSchema.update.body,
    },
    delete: userSchema.delete,
}