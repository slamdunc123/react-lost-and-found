import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import reminderReducer from './reminderReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';

export default combineReducers({
	itemReducer: itemReducer,
	reminderReducer: reminderReducer,
	authReducer: authReducer,
	alertReducer: alertReducer,
});
