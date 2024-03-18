const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    team: String,
    position: String,
    stats: {
        goals: Number,
        assists: Number,
        // Add other relevant stats as needed
    },
    gameweekPoints: [Number] // Array of length 38
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
