import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/authActions';
import { resetAlerts } from '../../../redux/actions/alertActions';
import { Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { initialValues, validationSchema } from './loginFormConfig';

const Login = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state) => state.authReducer.isAuthenticated
	);

	const handleOnSubmit = (fields) => {
		dispatch(resetAlerts());
		dispatch(login(fields.email, fields.password));
	};

	useEffect(() => {
		dispatch(resetAlerts());
	}, [dispatch]);

	if (isAuthenticated) {
		return <Redirect to='/' />;
	}

	return (
		<section className='container'>
			<h1>Login In</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleOnSubmit}
			>
				{({ errors, status, touched }) => (
					<Form>
						<div className='form-group'>
							<label htmlFor='email'>Email</label>
							<Field
								name='email'
								type='text'
								className={
									'form-control' +
									(errors.email && touched.email
										? ' is-invalid'
										: '')
								}
							/>
							<ErrorMessage
								name='email'
								component='div'
								className='invalid-feedback'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<Field
								name='password'
								type='text'
								className={
									'form-control' +
									(errors.password && touched.password
										? ' is-invalid'
										: '')
								}
							/>
							<ErrorMessage
								name='password'
								component='div'
								className='invalid-feedback'
							/>
						</div>
						<div className='form-group'>
							<button
								type='submit'
								className='btn btn-primary mr-2'
							>
								Login
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</section>
	);
};

export default Login;
