import { SET_ALERT, RESET_ALERTS } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case RESET_ALERTS:
			return (state = initialState);
		default:
			return state;
	}
};
