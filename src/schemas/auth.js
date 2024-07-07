import * as yup from 'yup';

const authSchema = {
    login: {
        body: yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        }).noUnknown(),
    }
}

export default {
    login: authSchema.login,
}