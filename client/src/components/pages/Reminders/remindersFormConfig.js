import * as Yup from 'yup';

export const initialValues = {
	name: '',
	date: '',
};

export const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	date: Yup.date().required('Date is required'),
});
