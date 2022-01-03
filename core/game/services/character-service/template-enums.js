const Player = require('./character/player/player');

const FakePlayer = require('./character/monster/fake-player');

const Monster = require('./character/monster/monster');
const Goblin = require('./character/monster/goblin');
const Tauren = require('./character/monster/tauren');
const DarkKnight = require('./character/monster/dark-knight');

module.exports = {
    player: {
        proto: Player,
    },
    monster: {
        proto: Monster,
    },
    goblin: {
        proto: Goblin,
    },
    tauren: {
        proto: Tauren,
    },
    dark_knight: {
        proto: DarkKnight,
    },
    fake_player: {
        proto: FakePlayer,
    }
};