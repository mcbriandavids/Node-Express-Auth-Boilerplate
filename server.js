const token = require('dotenv');
const express = require('express');
const app = express();

// Connect to DB
const connect = require('./Config/db');
connect();

// Middle-wares
app.use(express.json((extended = false)));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/post', require('./routes/post'));

// Server Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server Running on port ${port}`);
});
