import * as yup from 'yup';

const authSchema = {
    create: {
        body: yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        }).noUnknown(),
    }
}

export default {
    create: authSchema.create,
}