import * as Yup from 'yup';

export const initialValues = {
	name: '',
	desc: '',
	age: '',
	dob: '',
};

export const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	desc: Yup.string().required('Description is required'),
	age: Yup.string().required('Age is required'),
	dob: Yup.date().required('Date is required'),
});
