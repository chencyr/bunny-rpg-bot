const Player = require('./character/player/player');
const Monster = require('./character/monster/monster');

module.exports = {
    player: {
        proto: Player,
    },
    monster: {
        proto: Monster,
    },
};