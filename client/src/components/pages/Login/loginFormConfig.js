import * as Yup from 'yup';

export const initialValues = {
	email: '',
	password: '',
};

export const validationSchema = Yup.object().shape({
	email: Yup.string().required('Email is required'),
	password: Yup.string().required('Password is required'),
});
