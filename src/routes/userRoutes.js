const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            selectedPlayers: [null, null, null, null, null] // Initialize with 5 null values
        });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        // Generate a token, set up a session, or handle login success as needed
        res.send({ message: 'Login successful', selectedPlayers: user.selectedPlayers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});

module.exports = router;
