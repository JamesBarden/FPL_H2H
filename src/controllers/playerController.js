const Player = require('../models/Player');

function updatePlayerPoints(playerName, gameweek, points) {
    Player.updateOne(
        { name: playerName },
        { $set: { [`gameweekPoints.${gameweek - 1}`]: points } },
        (err, result) => {
            if (err) {
                console.error('Error updating points for player', playerName, ':', err);
            } else {
                console.log('Points updated for player', playerName);
            }
        }
    );
}

