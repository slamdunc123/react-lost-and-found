import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Main from './components/layout/Main/Main';
import './App.scss';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<Main />
			</Router>
		</Provider>
	);
}

export default App;
