const State = require('./state');

/**
 * Character dead state
 */
class Dead extends State
{
    static name() {
        return 'dead';
    }

    toString() {
        return "死亡";
    }
}

module.exports = Dead;