const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	itemId: {
		type: String,
		required: true,
	},
});

module.exports = Reminder = mongoose.model('reminder', ReminderSchema);
