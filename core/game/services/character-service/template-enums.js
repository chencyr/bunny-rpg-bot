const Player = require('./character/player/player');

const Monster = require('./character/monster/monster');
const Goblin = require('./character/monster/goblin');

module.exports = {
    player: {
        proto: Player,
    },
    monster: {
        proto: Monster,
    },
    goblin: {
        proto: Goblin,
    }
};