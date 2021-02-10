const express = require('express');
const router = express.Router();
const Reminder = require('../../models/Reminder');

const config = require('config');
const accountSid = config.get('TWILIO_ACCOUNT_SID');
const authToken = config.get('TWILIO_AUTH_TOKEN');
const phoneNumber = config.get('TWILIO_PHONE_NUMBER');
const client = require('twilio')(accountSid, authToken);

// @router  GET api/reminders - http://localhost:5000/api/reminders
// @desc    reminders test route
// @access  Public
// router.get('/', (req, res) => res.send('reminders test route'));

// @router  GET api/reminders - http://localhost:5000/api/reminders
// @desc    Get all reminders
// @access  Public

router.get('/', async (req, res) => {
	try {
		const reminders = await Reminder.find();
		res.json(reminders);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @router  POST api/reminders - http://localhost:5000/api/reminders
// @desc    Get all reminders
// @access  Public

// router.post('/sendSMS', (req, res) => {
// 	console.log('req.body', req.body);
// 	const { message: msg, to } = req.body;
// 	try {
// 		client.messages
// 			.create({
// 				body: msg,
// 				from: phoneNumber,
// 				to: to,
// 			})
// 			.then((message) => console.log(message))
// 			.then((message) => res.send(`the message is ${msg}`));
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server error');
// 	}
// });

// @router  GET api/reminders - http://localhost:5000/api/reminders/1
// @desc    Get reminders by userId
// @access  Public

// router.get('/:userId', async (req, res) => {
// 	console.log(req.params);
// 	try {
// 		const reminders = await Reminder.find({ userId: req.params.userId });
// 		res.json(reminders);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server error');
// 	}
// });

// @router  GET api/reminders - http://localhost:5000/api/reminders/1?itemId=2
// @desc    Get reminders by userId and filter by itemId
// @access  Public

router.get('/:userId', async (req, res) => {
	console.log(req.params);
	console.log(req.query);
	try {
		const reminders = await Reminder.find({ userId: req.params.userId })
			.where('itemId')
			.equals(req.query.itemId);
		res.json(reminders);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route POST api/reminders
// @desc Create a reminder
// @access Public

router.post('/', async (req, res) => {
	console.log('req.body', req.body);
	const { name, date, to } = req.body;
	try {
		// check if reminder name already exists
		// let reminder = await Reminder.findOne({
		// 	name: name,
		// });
		// if (reminder) {
		// 	return res.status(400).json({
		// 		errors: [{ msg: 'Reminder already exists' }],
		// 	});
		// }

		const newReminder = new Reminder({
			name: req.body.name,
			date: req.body.date,
			userId: req.body.userId,
			itemId: req.body.itemId,
		});
		console.log('newReminder', newReminder);
		// save item to database
		const reminder = await newReminder.save();
		res.json({ reminder: reminder, msg: 'Reminder created' });

		// twilio
		client.messages
			.create({
				body: `${name} reminder created.`,
				from: phoneNumber,
				to: to,
			})
			.then((message) => console.log(message))
			.then((message) => res.send(`the message is ${msg}`));
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route DELETE api/reminders
// @desc Delete an reminder
// @access Public

router.delete('/:id', async (req, res) => {
	try {
		// check if reminder exists
		const reminder = await Reminder.findById(req.params.id);
		console.log('reminder', reminder);
		const { name } = reminder;

		// if id is a valid format but doesn't exist in database
		if (!reminder) {
			return res.status(404).json({
				msg: 'Reminder not found',
			});
		}

		await reminder.remove();

		res.json({
			msg: 'Reminder deleted successfully.',
		});

		// // twilio
		// client.messages
		// 	.create({
		// 		body: `${name} reminder deleted.`,
		// 		from: phoneNumber,
		// 		to: to,
		// 	})
		// 	.then((message) => console.log(message))
		// 	.then((message) => res.send(`the message is ${msg}`));
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route UPDATE api/reminders
// @desc Update an reminder
// @access Public

router.put('/:id', async (req, res) => {
	const { name, date, to } = req.body;
	try {
		// check if reminder exists
		let reminder = await Reminder.findById(req.params.id);

		// if id is a valid format but doesn't exist in database
		if (!reminder) {
			return res.status(404).json({
				msg: 'Reminder not found',
			});
		}
		reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body);
		await res.json({
			msg: 'Reminder updated successfully.',
			reminder: reminder,
		});

		// twilio
		client.messages
			.create({
				body: `${name} reminder updated.`,
				from: phoneNumber,
				to: to,
			})
			.then((message) => console.log(message))
			.then((message) => res.send(`the message is ${msg}`));
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
