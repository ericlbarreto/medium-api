import * as yup from 'yup';

const findById = {
    params: yup.object().shape({
        id: yup.string().required(),
    }).noUnknown(),
}

const userSchema = {
    create: {
        body: yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
        }).noUnknown(),
    },
    read: findById.params,
    update: {
        params: findById.params,
        body: yup.object().shape({
            name: yup.string(),
            email: yup.string().email(),
            password: yup.string(),
        }).noUnknown(),
    },
    delete: findById.params,
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