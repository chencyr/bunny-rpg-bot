
/**
 * Buff base class
 *
 */
class StandardBuff
{
    /**
     * Constructor
     *
     * @param character {Character}
     */
    constructor(character) {
        this.context = character;

        const time = this.getEffectTime();
        const self = this;
        const interval = setInterval(function() {self.effect()}, this.getFrequency());

        if(time > 0) {
            setTimeout(() => {
                clearInterval(interval);
            }, time);
        }
    }

    /**
     * Get context.
     * @return {Character}
     */
    getContext() {
        return this.context;
    }

    /**
     * Effective
     */
    effect() {
        throw new Error('Not implement method.');
    }

    /**
     * Define buff frequency
     *
     * @return {number} ms
     */
    getFrequency() {
        throw new Error('Not implement method.');
    }

    /**
     * Define buff effect time
     *
     * @return {number} ms, if time = 0 forever
     */
    getEffectTime() {
        throw new Error('Not implement method.');
    }
}

module.exports = StandardBuff;