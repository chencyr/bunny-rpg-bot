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
        return `死亡(${this.context.revive_limit - this.context.revive_timer})`;
    }

    /**
     * Hook for state change up
     * @return {State}
     */
    up() {
        this.reviveIntervalId = setInterval(() => {
            this.context.revive_timer++;
            if(this.context.revive_timer >= this.context.revive_limit) {
                this.context.changeState('normal');
            }
        }, 1000);
        return this;
    }

    /**
     * Hook for state change down
     * @return {State}
     */
    down() {
        if(this.reviveIntervalId) {
            clearInterval(this.reviveIntervalId)
        }
        this.context.revive_timer = 0;
        return this;
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