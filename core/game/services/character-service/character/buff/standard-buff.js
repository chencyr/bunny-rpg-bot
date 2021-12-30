
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
        this.up();
        const interval = setInterval(function() {self.effect()}, this.getFrequency());

        if(time > 0) {
            setTimeout(() => {
                clearInterval(interval);
                self.down();
                this.context.removeBuff(self);
            }, time);
        }
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getName() {
        throw new Error('Not implement method.');
    }

    /**
     * Get context.
     * @return {Character}
     */
    getContext() {
        return this.context;
    }

    /**
     * Buff up
     * @param options
     */
    up(options) {
        // not things to do
    }

    /**
     * Buff down
     * @param options
     */
    down(options) {
        // not things to do
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