const StandardBuff = require('./standard-buff');

/**
 * AutoSpRegenBuff
 */
class AutoSpRegenBuff extends StandardBuff
{
    /**
     * Constructor
     *
     * @param character
     */
    constructor(character) {
        super(character);
    }

    /**
     * Internal inject for ignore property.
     * @return {function(*, *, *, *): boolean}
     */
    getIgnoreCondition() {
        return (repeatIndex, sender, receiver, args) => receiver.isState('dead');
    }

    /**
     * Get buff ID.
     * @return {string}
     */
    getId() {
        return "auto-sp-regen-buff";
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getName() {
        return "SP 自然恢復"
    }

    /**
     * Effective
     */
    effect() {
        const status = this.getContext().getStatus();
        const max = status.max_sp;
        const regen = Math.floor(status.max_sp * 0.03);

        if(max == status.sp) {
            return;
        }

        if(status.sp + regen > max) {
            status.sp = max;
        }
        else {
            status.sp += regen;
        }
        console.log(`Character ${status.name}  regen SP +${regen}, Current SP: ${status.sp}/${status.max_sp}`);
    }

    /**
     * Define buff frequency
     *
     * @return {number} ms
     */
    getFrequency() {
        return 1000 * 5;
    }

    /**
     * Define buff effect time
     *
     * @return {number} ms, if time = 0 forever
     */
    getEffectTime() {
        return 0;
    }
}

module.exports = AutoSpRegenBuff;