// Import required modules
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Fantasy Premier League!');
});

// Set up the server to listen on a specific port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
