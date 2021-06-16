const State = require('./state');

/**
 * Character Normal state
 */
class Normal extends State
{
    static name() {
        return 'normal';
    }

    toString() {
        return "正常";
    }
}

module.exports = Normal;