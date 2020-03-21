const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		min: 5
	},
	email: {
		type: String,
		required: true,
		unique: true,
		max: 20,
		min: 6
	},
	password: {
		type: String,
		required: true,
		unique: true,
		min: 6
	},
	date: {
		type: 'date',
		default: Date.now()
	}
});

module.exports = mongoose.model('User', UserSchema);
