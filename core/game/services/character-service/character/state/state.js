/**
 * Character base state class
 */
class State
{
    /**
     * Constructor
     * @param context {Character}
     */
    constructor(context) {
        this.context = context;
    }

    /**
     * Define state name.
     * @return {string}
     */
    static name() {
        return "state";
    }

    /**
     * Get current instance state name.
     * @return {string}
     */
    getName() {
        return this.constructor.name();
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
        // TODO refactor by context.agi, str, ... by class getter
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

        let dodge = this.context.agi * dodgeParam;

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
        let defValue = this.context.vit * defParam * 5;

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

        this.context.currentHP = Math.floor(this.context.currentHP - result.damageHp);
        if (this.context.currentHP <= 0) {
            this.context.currentHP = 0;
            this.context.changeState('dead');
            result.exp = this.context.toExp();
        }
        result.hp = this.context.currentHP;


        return result;
    }

    /**
     * Create damage info.
     * @return {{accuracy: number, value: number}}
     */
    createDamage() {
        // 傷害隨機倍率參數
        const atkParam = this.getRandom(80, 120) / 100;

        // 精准度隨機倍率參數
        const accParam = this.getRandom(80, 100) / 100;

        let value = this.context.str * atkParam * 10;
        let accuracy = this.context.dex * accParam;

        return {
            value: value,
            accuracy: accuracy,
            repeat: 1,
            max_to: 1,
            ignore: (repeatIndex, sender, receiver, args) => receiver.isState('dead'),
        };
    }

    /**
     * Check the character is can create damage.
     *
     * @param skill
     * @param senders
     * @param receiver
     * @param action
     * @param args
     */
    verifyCreateDamage(skill, senders, receiver, action, args) {
        return {
            canDo: true,
            reason: "可以產生傷害",
        };
    }

    /**
     * Check the character is can create damage.
     *
     * @param skill
     * @param sender
     * @param receiver
     * @param action
     * @param args
     */
    verifyCreateDamage(skill, sender, receiver, action, args) {
        return {
            canDo: true,
            reason: "可以產生傷害",
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
            canDo: true,
            reason: "可以受到傷害",
        };
    }
}

module.exports = State;