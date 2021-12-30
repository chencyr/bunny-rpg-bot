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
     * Hook for state change up
     * @return {State}
     */
    up() {
        this.context.currentHP = this.context.maxHP;
        this.context.currentMP = this.context.maxMP;
        this.context.currentSP = this.context.maxSP;

        return this;
    }

    /**
     * Hook for state change down
     * @return {State}
     */
    down() {
        return this;
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