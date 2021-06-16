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

    /**
     * Create damage for attack other object.
     * @return {{accuracy: number, value: number}}
     */
    createDamage() {
        throw new Error("Cannot create damage in dead state.");
    }

    /**
     * Received other object's damage.
     * @param damage
     * @return {{isDodge: boolean, isCritical: boolean, exp: number, damageHp: number}}
     */
    receiveDamage(damage) {
        throw new Error("Cannot received damage in dead state.");
    }
}

module.exports = Dead;