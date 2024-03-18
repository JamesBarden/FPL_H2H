// Import required modules
const express = require('express');
const path = require('path');
require('dotenv').config(); //load environment variables
const mongoose = require('./db'); //import the database connection

// Create an instance of the Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//include routes
const playerRoutes = require('./routes/playerRoutes')

//Middleware
app.use(express.json());
app.use('/api', playerRoutes);

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



