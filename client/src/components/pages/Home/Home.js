import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
	const { token, isAuthenticated, user } = useSelector(
		(state) => state.authReducer
	);
	console.log(token, isAuthenticated, user);
	//TODO: this is logging the user out and needs fixing - try using token or some combination of token and isAuthenticated and user to validate user logged in
	const getWelcome = () => {
		if (isAuthenticated) {
			if (user) {
				return <h1>Welcome {user.name}</h1>;
			} else {
				return <h1>Welcome {localStorage.getItem('name')}</h1>;
			}
		} else {
			return <h1>Please login or register</h1>;
		}
	};
	return <div className='container'>{getWelcome()}</div>;
};

export default Home;
