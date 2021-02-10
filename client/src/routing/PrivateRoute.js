import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = useSelector(
		(state) => state.authReducer.isAuthenticated
	);
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /login
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
			}
		/>
	);
};

export default PrivateRoute;
