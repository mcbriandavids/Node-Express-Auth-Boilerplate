const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../Models/User');
const { schemaLogin } = require('../validation');
const midAuth = require('../middleware/tokenAuth');
const bcrypt = require('bcryptjs');

// Login
router.post('/login', async (req, res) => {
	console.log(req.body);
	const error = schemaLogin;
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Check if User Exist
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) return res.status(400).send('Invalid Credentials');
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).send('Invalid Credentials');
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
				res.json({
					token
				});
			}
		);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

router.get('/login', midAuth, async (req, res) => {
	try {
		const user = await User.findOne(req.user.id).select('-password');
		console.log(user);
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(400).send('Server Error');
	}
});

module.exports = router;
