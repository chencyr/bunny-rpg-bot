
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
        // not things to do.
    }

    /**
     * Set character as context.
     * @param character
     */
    setCharacter(character) {
        this.context = character;
    }

    /**
     * Trigger
     */
    trigger() {
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
     * Getter for property ignore.
     * @return {function(*, *, *, *): boolean}
     */
    get ignore() {
        return this.getIgnoreCondition();
    }

    /**
     * Setter for property ignore.
     * @param argv
     */
    set ignore(argv) {
        throw new Error("Cannot set the protected property ignore.");
    }

    /**
     * Getter for property immediately
     */
    get immediately() {
        return this.getImmediatelyCondition();
    }

    /**
     * Setter for property immediately
     * @param argv
     */
    set immediately(argv) {
        throw new Error("Cannot set the protected property ignore.");
    }

    /**
     * Internal inject for ignore property.
     * @return {function(*, *, *, *): boolean}
     */
    getIgnoreCondition() {
        throw new Error('Not implement error.');
    }

    /**
     * Internal inject for immediately property.
     * @return {boolean}
     */
    getImmediatelyCondition() {
        return true;
    }

    /**
     * Get buff ID.
     * @return {string}
     */
    getId() {
        return "standard-buff";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            this.getName(),
        ];
    }

    /**
     * Get buff master name
     *
     * @return {string}
     */
    getName() {
        return "standard-buff";
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
        // not things to do
    }

    /**
     * Define buff frequency
     *
     * @return {number} ms
     */
    getFrequency() {
        return 1;
    }

    /**
     * Define buff effect time
     *
     * @return {number} ms, if time = 0 forever
     */
    getEffectTime() {
        return 1;
    }
}

module.exports = StandardBuff;