// Import required modules
const express = require('express');
const path = require('path');

//adding these to use later
const cors = require('cors');
const morgan = require('morgan');


require('dotenv').config(); //load environment variables
const mongoose = require('./db'); //import the database connection

// Create an instance of the Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

//include routes
const playerRoutes = require('./routes/playerRoutes');
const userRoutes = require('./routes/userRoutes');

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/players', playerRoutes);
app.use('/api/users', userRoutes);


//Error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Set up the server to listen on a specific port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



