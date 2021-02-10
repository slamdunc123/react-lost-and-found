import * as Yup from 'yup';

export const initialValues = {
	name: '',
	email: '',
	password: '',
	passwordConfirmation: '',
};

export const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	email: Yup.string().required('Email is required'),
	password: Yup.string().required('Password is required'),
	passwordConfirmation: Yup.string()
		.required('Confirm Password is required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
