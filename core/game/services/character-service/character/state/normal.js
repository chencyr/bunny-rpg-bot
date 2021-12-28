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
        const status = Object.assign({}, this.status);
        this.status.hp = status.max_hp;
        this.status.mp = status.max_mp;
        this.status.sp = status.max_sp;

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