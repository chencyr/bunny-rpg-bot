const State = require('./state');

/**
 * Character knocked out state
 */
class KnockedOut extends State
{
    static name() {
        return 'knocked-out';
    }

    toString() {
        return `倒地不起(${this.context.revive_limit - this.context.revive_timer})`;
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
        throw new Error("Cannot create damage in knocked out state.");
    }

    /**
     * Received other object's damage.
     * @param damage
     * @return {{isDodge: boolean, isCritical: boolean, exp: number, damageHp: number}}
     */
    receiveDamage(damage) {
        return super.receiveDamage(damage);
    }

    /**
     * Check the character is can create damage.
     *
     * @param skill
     * @param sender
     * @param receivers
     * @param action
     * @param args
     */
    verifyCreateDamage(skill, sender, receivers, action, args) {
        return {
            canDo: false,
            reason: `[${sender.getName()}] 為 [${sender.state}] 狀態，無法使用技能 [${skill.getDisplayName()}]`,
        };
    }
}

module.exports = KnockedOut;