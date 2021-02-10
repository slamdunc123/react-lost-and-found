import { GET_REMINDERS } from '../actions/types';
import { CREATE_REMINDER } from '../actions/types';
import { DELETE_REMINDER } from '../actions/types';
import { UPDATE_REMINDER } from '../actions/types';

const initialState = {
	reminders: [],
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_REMINDERS:
			console.log('GET_REMINDERS called', payload);
			return {
				...state,
				reminders: payload,
				loading: false,
			};
		case CREATE_REMINDER:
			console.log('CREATE_REMINDER called', payload);
			return {
				...state,
				reminders: [...state.reminders, payload],
				loading: false,
			};
		case DELETE_REMINDER:
			console.log('DELETE_REMINDER called', payload);
			return {
				...state,
				reminders: state.reminders.filter(
					(reminder) => reminder._id !== payload
				),
				loading: false,
			};

		case UPDATE_REMINDER:
			console.log('UPDATE_REMINDER called', payload);
			state.reminders.find((reminder) => {
				if (reminder._id === payload.id) {
					reminder.name = payload.name;
					reminder.date = payload.date;
					return {
						...state,
						reminders: [...state.reminders, payload],
						loading: false,
					};
				} else return state;
			});
		default:
			return state;
	}
}
