const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Route to create a new player
router.post('/players', (req, res) => {
    const newPlayer = new Player({
        name: req.body.name,
        position: req.body.position,
        points: req.body.points,
    });

    newPlayer.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving player to database');
        } else {
            console.log('Player saved to database');
            res.status(201).send('Player created');
        }
    });
});

module.exports = router;
