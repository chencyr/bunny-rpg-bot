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

    /**
     * Create damage for attack other object.
     * @return {{accuracy: number, value: number}}
     */
    createDamage() {
        return super.createDamage();
    }

    /**
     * Received other object's damage.
     * @param damage
     * @return {{isDodge: boolean, isCritical: boolean, exp: number, damageHp: number}}
     */
    receiveDamage(damage) {
        return super.receiveDamage(damage);
    }
}

module.exports = Normal;