import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { initialValues, validationSchema } from './itemsFormConfig';
import moment from 'moment';
import FileBase from 'react-file-base64';
import './items.scss';

const ItemsForm = ({ isEditing, editedItem, handleCreate, handleUpdate }) => {
	const { name, desc, dob, age } = editedItem;
	const [imageFile, setImageFile] = useState();
	const [isImageFileSize, setIsImageFileSize] = useState(true);

	console.log(name, desc, dob, age);

	// const getImageFileValidation = () => {
	//     if(imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)){
	//         alert('image file wrong format')
	//     }
	// }

	const getFormData = (fields) => {
		if (imageFile) {
			return { ...fields, imageFile };
		} else {
			return { ...fields };
		}
	};

	const handleOnSubmit = (fields, { resetForm }) => {
		// console.log(imageFile.length);
		// console.log(((imageFile.length / 4) * 3) / 1064); // b64Length to KB
		// const b64Length = ((200 * 4) / 3) * 1064; // KB to b64Length
		// console.log(b64Length);

		if (imageFile && imageFile.length > 283733) {
			setIsImageFileSize(false);
		} else {
			const formData = getFormData(fields);
			console.log(formData);
			isEditing
				? handleUpdate(editedItem.id, formData)
				: handleCreate(formData);
			resetForm(initialValues);
		}
	};

	return (
		<div className='container'>
			{console.log(isEditing)}
			{console.log(initialValues)}
			<Formik
				enableReinitialize
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={
					isEditing ? { name, desc, age, dob } : initialValues
				}
				validationSchema={validationSchema}
				onSubmit={handleOnSubmit}
			>
				{({ values, errors, status, touched }) => (
					<Form>
						{console.log(values)}
						<div className='form-group'>
							<label htmlFor='name'>Name</label>
							<Field
								value={values.name}
								name='name'
								type='text'
								className={
									'form-control' +
									(errors.name && touched.name
										? ' is-invalid'
										: '')
								}
							/>
							<ErrorMessage
								name='name'
								component='div'
								className='invalid-feedback'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='desc'>Description</label>
							<Field
								value={values.desc}
								name='desc'
								type='text'
								className={
									'form-control' +
									(errors.desc && touched.desc
										? ' is-invalid'
										: '')
								}
							/>
							<ErrorMessage
								name='desc'
								component='div'
								className='invalid-feedback'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='age'>Age</label>
							<Field
								value={values.age}
								name='age'
								type='text'
								className={
									'form-control' +
									(errors.age && touched.age
										? ' is-invalid'
										: '')
								}
							/>
							<ErrorMessage
								name='age'
								component='div'
								className='invalid-feedback'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='dob'>D-O-B</label>
							<Field
								value={moment(values.dob).format('yyyy-MM-DD')}
								name='dob'
								type='date'
								className={
									'form-control' +
									(errors.dob && touched.dob
										? ' is-invalid'
										: '')
								}
							/>
							<ErrorMessage
								name='dob'
								component='div'
								className='invalid-feedback'
							/>
						</div>
						<div className='form-group'>
							<div className='form-control'>
								<FileBase
									type='file'
									multiple={false}
									onDone={({ base64 }) =>
										setImageFile(base64)
									}
								/>
							</div>
							{!isImageFileSize ? (
								<p
									className='text-danger'
									style={{ fontSize: '.8rem' }}
								>
									Max file size is 200KB
								</p>
							) : null}
						</div>
						<hr />
						<div className='form-group'>
							<button
								type='submit'
								className='btn btn-primary mr-2'
							>
								{isEditing ? 'Update' : 'Add'}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ItemsForm;
