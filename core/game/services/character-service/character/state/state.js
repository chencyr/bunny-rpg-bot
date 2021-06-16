/**
 * Character base state class
 */
class State
{
    constructor(context) {
        this.context = context;
    }

    /**
     * Hook for state change up
     * @return {State}
     */
    up() {
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
     * Get context's status
     * @return {*}
     */
    get status() {
        return this.context.status;
    }

    /**
     * Get random int method from context
     * @return {*|Character.getRandom}
     */
    get getRandom() {
        return this.context.getRandom;
    }

    /**
     * Check is dodged
     * @param damage {object} damage info
     * @return {boolean}
     */
    isDodge(damage) {
        // 迴避隨機倍率參數
        const dodgeParam = this.getRandom(90, 100) / 100;
        const baseDodgeProb = 20; // percentage

        let dodge = this.status.agi * dodgeParam;

        // 閃避補正
        let dodComp = dodge - damage.accuracy;
        if(dodComp < 0) {
            dodComp = 0;
        }
        if(dodComp > 100) {
            dodComp = 100;
        }

        if (this.getRandom(0, 100) <= (baseDodgeProb + dodComp)) {
            return true;
        }

        return false;
    }

    /**
     * Compute damage HP value.
     * @param damage
     * @return {number}
     */
    computeDamageHp(damage) {
        // 防禦隨機倍率參數
        const defParam = this.getRandom(90, 100) / 100;
        let defValue = this.status.vit * defParam * 3;

        let damageHp = Math.floor(damage.value - defValue);
        if (damageHp < 0) {
            damageHp = 0;
        }

        return damageHp;
    }

    /**
     * Received other object's damage.
     * @param damage
     * @return {{isDodge: boolean, isCritical: boolean, exp: number, damageHp: number}}
     */
    receiveDamage(damage) {
        const result = {
            isDodge: false,
            damageHp: 0,
            isCritical: false,
            exp: 0,
        };

        result.isDodge = this.isDodge(damage);

        if (! result.isDodge) {
            result.damageHp = this.computeDamageHp(damage);
        }

        this.status.hp = Math.floor(this.status.hp - result.damageHp);
        if (this.status.hp <= 0) {
            this.status.hp = 0;
            this.context.changeState('dead');
        }
        result.hp = this.status.hp;

        return result;
    }
}

module.exports = State;