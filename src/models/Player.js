const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
	name: String,
	position: String,
	points: Number,
	// Add other fields as needed
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
