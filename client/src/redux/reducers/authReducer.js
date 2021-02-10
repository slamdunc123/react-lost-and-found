import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	USER_LOADED,
	AUTH_ERROR,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: localStorage.getItem('token') ? true : false,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			localStorage.setItem('userId', payload._id);
			localStorage.setItem('name', payload.name);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
		case AUTH_ERROR:
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			localStorage.removeItem('name');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			};
		default:
			return state;
	}
}
