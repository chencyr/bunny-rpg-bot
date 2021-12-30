const StandardBuff = require('./standard-buff');

/**
 * AutoMpRegenBuff
 */
class AutoMpRegenBuff extends StandardBuff
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
        return "auto-mp-regen-buff";
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getName() {
        return "MP 自然恢復"
    }

    /**
     * Effective
     */
    effect() {
        const status = this.getContext().getStatus();
        const max = status.max_mp;
        const regen = Math.floor(status.max_mp * 0.03);

        if(max == status.mp) {
            return;
        }

        if(status.mp + regen > max) {
            status.mp = max;
        }
        else {
            status.mp += regen;
        }
        console.log(`Character ${status.name}  regen MP +${regen}, Current MP: ${status.mp}/${status.max_mp}`);
    }

    /**
     * Define buff frequency
     *
     * @return {number} ms
     */
    getFrequency() {
        return 1000 * 10;
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

module.exports = AutoMpRegenBuff;