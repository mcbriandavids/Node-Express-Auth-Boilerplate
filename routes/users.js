const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { schemaRegistration } = require('../validation');

// Registration
router.post('/register', async (req, res) => {
	const error = schemaRegistration;
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const { name, email, password } = req.body;
	try {
		// Check if User Exist
		let user = await User.findOne({ email });
		if (user) return res.status(400).send('User Already Exist');

		user = new User({
			name,
			email,
			password
		});
		// Encrypt Password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();
		// Return jsonwebtoken
		const payload = {
			user: {
				id: user.id
			}
		};
		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{
				expiresIn: 3600
			},
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
