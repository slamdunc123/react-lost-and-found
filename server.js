const express = require('express');
const conn = require('./config/db');
const path = require('path');

const config = require('config');
const accountSid = config.get('TWILIO_ACCOUNT_SID');
const authToken = config.get('TWILIO_AUTH_TOKEN');
const client = require('twilio')(accountSid, authToken);

const app = express();

// twilio

// app.get('/reminders/sendSMS', (req, res) => {
// 	client.messages
// 		.create({
// 			body:
// 				'Hi Jules. Item reminders here. Your beautiful bear cub Bezza Boo is due a great big kiss today. Please remember or she gets sad.',
// 			from: '+12517584500',
// 			// to: '+447939912487',
// 			to: '+447968903859',
// 		})
// 		.then((message) => res.send(message.id));
// });

// connect to database
conn();

// init middleware (inc bodyParser which allows data to be retrieved in req.body eg in user.js)
// app.use(express.json({ extended: false }));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(
	express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);

// test route - http://localhost:5000
// app.get('/', (req, res) => res.send('test route successful'));

// define routes
app.use('/api/items', require('./routes/api/items')); //localhost:5000/api/items
app.use('/api/auth', require('./routes/api/auth')); // http://localhost:5000/api/auth
app.use('/api/users', require('./routes/api/users')); // http://localhost:5000/api/users
app.use('/api/reminders', require('./routes/api/reminders')); //localhost:5000/api/reminders
app.use('/api/reminders', require('./routes/api/reminders')); //localhost:5000/api/reminders

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
