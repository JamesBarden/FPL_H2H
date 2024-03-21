const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Positions, Teams } = require('../utils/constants');

const playerSchema = new Schema({
    name: String,
    team: { type: String, enum: Object.values(Teams) },
    position: { type: String, enum: Object.values(Positions) },
    stats: {
        goals: Number,
        assists: Number,
        // Add other relevant stats as needed
    },
    gameweekPoints: [Number] // Array of length 38
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
