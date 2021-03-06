const State = require('./state');
const NoramalState = require('./normal');

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
     * Check can change to next state.
     * @param nextState
     * @return {boolean}
     */
    canChange(nextState) {
        if (nextState instanceof NoramalState) {
            return true;
        }

        return false;
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

    /**
     * Check the character is can receive damage.
     *
     * @param skill
     * @param senders
     * @param receiver
     * @param action
     * @param args
     */
    verifyReceivedDamage(skill, senders, receiver, action, args) {
        return {
            canDo: false,
            reason: `技能 [${skill.getDisplayName()}] 的使用對象 [${receiver.getName()}] 不能為 [${receiver.state}]`,
        };
    }
}

module.exports = Dead;