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
        console.log(`Character regen SP +${regen}, Current SP: ${status.sp}/${status.max_sp}`);
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