import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Routes from '../../../routing/Routes';

const Main = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route component={Routes} />
		</Switch>
	);
};

export default Main;
