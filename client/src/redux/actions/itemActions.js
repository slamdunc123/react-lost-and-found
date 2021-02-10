import axios from 'axios';
import { GET_ITEMS } from './types';
import { CREATE_ITEM } from './types';
import { DELETE_ITEM } from './types';
import { UPDATE_ITEM } from './types';
import { setAlert } from './alertActions';

// get items
export const getItems = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/items/${id}`);

		dispatch({
			type: GET_ITEMS,
			payload: res.data,
		});
	} catch (err) {
		console.error(err.error);
	}
};

// create item
export const createItem = (formData, userId) => async (dispatch) => {
	console.log('createItem fired', formData, userId);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = { ...formData, userId };
	console.log(body);

	try {
		const res = await axios.post('/api/items', body, config);
		console.log(res.data.item);

		dispatch({
			type: CREATE_ITEM,
			payload: res.data.item,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};

// delete item
export const deleteItem = (id) => async (dispatch) => {
	console.log('deleteItem fired', id);
	try {
		const res = await axios.delete(`/api/items/${id}`);

		dispatch({
			type: DELETE_ITEM,
			payload: id,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.error(err.error);
	}
};

export const updateItem = (id, formData) => async (dispatch) => {
	console.log('udpateItem fired', id, formData);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = formData;
	console.log(body);
	try {
		const res = await axios.put(`/api/items/${id}`, body, config); // pass edited item id, new formData, headers
		dispatch({
			type: UPDATE_ITEM,
			payload: res.data,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.error(err.error);
	}
};
