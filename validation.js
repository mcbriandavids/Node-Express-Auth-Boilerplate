const Joi = require('@hapi/joi');

//Registration Validation
const schemaRegistration = Joi.object({
	name: Joi.string()
		.min(5)
		.required(),
	email: Joi.string()
		.max(20)
		.min(6)
		.email(),
	password: Joi.string()
		.min(6)
		.required()
});

// Login Validation

const schemaLogin = Joi.object({
	email: Joi.string()
		.max(20)
		.min(6)
		.email(),
	password: Joi.string()
		.min(6)
		.required()
});

module.exports = schemaRegistration;
module.exports = schemaLogin;
