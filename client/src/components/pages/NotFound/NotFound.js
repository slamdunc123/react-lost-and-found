import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
	const [seconds, setSeconds] = useState(3);
	const history = useHistory();

	useEffect(() => {
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000);
		} else {
			history.push('/'); //TODO: could't get this to work with Redirect
		}
	});

	return (
		<div className='container'>
			<div className='alert alert-danger' role='alert'>
				404 - Page Not Found!
				<p>{`Redirecting to home page in ${seconds}`}</p>
			</div>
		</div>
	);
};

export default NotFound;
