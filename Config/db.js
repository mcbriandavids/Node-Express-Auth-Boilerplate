const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connect = async () => {
	try {
		await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
		console.log('Connected');
	} catch (error) {
		console.log('Not Connect');
	}
};

module.exports = connect;
